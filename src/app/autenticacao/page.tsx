"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { Back } from "@/components/back";
import { useZxing } from "react-zxing";
import { ICart, IOption } from "@/utils/interfaces";
import { transformPricePTBR } from "@/utils/scripts";
import { Loading } from "@/components/loading";

interface IItems {
  numero_venda: number;
  numero_pedido: number;
  itens: ICart;
}

export default function Auth() {
  const { cart, setCart, table, pdv, setError, loading, setLoading } =
    useAppContext();
  const [cod, setCod] = useState<any>(null);
  const [items, setItems] = useState<Array<IItems>>([] as Array<IItems>);
  const [open, setOpen] = useState<boolean>(false);
  const [teste, setTeste] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [number, setNumber] = useState<number>(0);
  const route = useRouter();

  const { ref } = useZxing({
    onDecodeResult(result) {
      if (cod === null) {
        setCod(result);
        _onDetected(result.getText());
      } else {
        return () => {};
      }
    },
  });

  const getGuest = async (code: any) => {
    return fetch("/api/auth/user", {
      method: "POST",
      body: JSON.stringify({
        cliente_id: code,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const getOrder = async () => {
    return fetch("/api/order/new", {
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const postCart = async (guest_id: number, num_order: number) => {
    const arr: Array<IItems> = [];

    for (let item in cart) {
      await fetch("/api/order/new-item", {
        method: "POST",
        body: JSON.stringify({
          cliente_id: Number(guest_id),
          mesa: Number(table),
          pdv: Number(pdv),
          numero_pedido: num_order,
        }),
      })
        .then((res: any) => res.json())
        .then((response: any) => {
          const numV: number = response.NUMEROVENDA;
          arr.push({
            numero_venda: numV,
            numero_pedido: num_order,
            itens: cart[item],
          });
        })
        .catch((err: any) => {
          console.error(err);
          return err;
        });
    }

    return arr;
  };

  const postCheckout = async (data: Array<IItems>) => {
    return await Promise.all(
      data.map((item: IItems, index: number) => {
        fetch("/api/order/checkout", {
          method: "POST",
          body: JSON.stringify({
            numero_venda: item.numero_venda,
            numero_pedido: item.numero_pedido,
            itens:
              item.itens.options && item.itens.options?.length > 0
                ? item.itens.options?.map((opt) => ({
                    cod_artigo: item.itens.code,
                    cod_detalhe: opt.id,
                    qtd: item.itens.quantity,
                  }))
                : [
                    {
                      cod_artigo: item.itens.code,
                      cod_detalhe: null,
                      qtd: item.itens.quantity,
                    },
                  ],
          }),
        })
          .then((res: any) => res.json())
          .catch((err: any) => {
            console.error(err);
            return err;
          });
      })
    );
  };

  const _onDetected = async (code: any) => {
    setLoading(true);
    const guest = await getGuest(code);

    if (guest) {
      setClientName(guest.HOSPEDE);

      const number_order = await getOrder();
      setNumber(number_order.NUMERO_PEDIDO);

      const data = await postCart(code, number_order.NUMERO_PEDIDO);
      if (number_order.NUMERO_PEDIDO && data) {
        setLoading(false);
        setItems(data);
        setOpen(!open);
        return;
      }
    }

    if (guest.error.includes("Hospede não encontrado")) {
      setError(
        "Não foi possível concluir o pedido, cartão consumo não localizado. Procurar a recepção."
      );
    }

    if (guest.error.includes("Cannot read properties")) {
      setError(
        "Não foi possível concluir o pedido, ocorreu um erro ao montar o seu pedido."
      );
    }

    return route.push("/autenticacao/erro");
  };

  const confirm = async () => {
    const check = await postCheckout(items);

    if (!check) {
      setError(
        "Erro ao tentar finalizar pedido. Tente novamente ou solicite suporte na recepção."
      );
      return route.push("/autenticacao/erro");
    }

    setLoading(true);
    setOpen(!open);
    setCart([]);
    localStorage.removeItem("cart");
    return route.push("/autenticacao/sucesso");
  };

  const total = () => {
    if (cart.length === undefined) return 0;

    let newTotal: number = 0;
    for (let item in cart) {
      newTotal += cart[item].total;
    }

    return newTotal;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden ">
      <Back />
      <button onClick={() => setTeste(!teste)}>Abrir Scanner</button>
      {teste && (
        <>
          <h2 className="text-xl text-primary-color text-center m-4">
            Por favor, posicione o código de barras na câmera
          </h2>
          <video ref={ref} />
        </>
      )}
      {loading && <Loading />}
      {open && (
        <div className="fixed inset-0 bg-color-op z-10">
          <div className="flex justify-center item-center flex-col w-full h-full">
            <div className="m-auto w-11/12 flex flex-col gap-4 bg-card-bg p-4 rounded-xl">
              <header className="text-left ">
                <h1 className="text-center font-medium mb-4 py-2 border-b-2 text-lg uppercase">
                  Confirmar do pedido
                </h1>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{clientName}</p>
                    <p className="text-primary-color text-2xl">
                      <strong>R$ {transformPricePTBR(total())}</strong>
                    </p>
                    <p className="text-sm uppercase font-medium">
                      Mesa: {table}
                    </p>
                  </div>
                  <p className="p-2 rounded-xl bg-primary-color text-white text-2xl font-semibold">
                    Nº {number}
                  </p>
                </div>
              </header>
              <main>
                <h2 className="font-bold mb-2">Suas escolhas...</h2>
                <div className="max-h-60 overflow-y-scroll">
                  {cart.map((item: ICart) => (
                    <div>
                      <div className="flex justify-between">
                        <p className="font-medium">
                          {item.quantity}x {item.name}
                        </p>
                        <p className="text-right font-medium">
                          R${transformPricePTBR(item.price)}
                        </p>
                      </div>
                      <div className="pl-6">
                        {item.options?.map((opt: IOption) => (
                          <p className="opacity-50 text-xs">
                            <strong>{opt.name}</strong>
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </main>
              <footer>
                <button
                  type="button"
                  className="uppercase font-bold text-center w-full p-2 bg-primary-color text-white border-2 border-primary-color rounded-lg "
                  onClick={confirm}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="uppercase font-bold text-center w-full p-2 border-2 border-primary-color text-primary-color rounded-lg mt-4"
                  onClick={() => route.back()}
                >
                  Cancelar
                </button>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
