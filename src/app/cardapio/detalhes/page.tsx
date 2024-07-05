"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { ICart, IDish, IOption } from "@/utils/interfaces";
import { transformPricePTBR } from "@/utils/scripts";
import Link from "next/link";
import { Back } from "@/components/back";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DetailsLayout() {
  const { cart, setCart, product, setProduct, incrementItemCart } =
    useAppContext();

  const [qtt, setQtt] = useState<number>(1);
  const [options, setOptions] = useState<Array<IOption>>([] as Array<IOption>);
  const [newOptions, setNewOptions] = useState<Array<string>>([]);
  const [obs, setObs] = useState<string>("");
  const router = useRouter();

  function incremment() {
    const newQtt = qtt + 1;
    setQtt(newQtt);
  }

  function decremment() {
    if (qtt === 1) return;
    const newQtt = qtt - 1;
    setQtt(newQtt);
  }

  function handleOptions(item: IOption) {
    if (options.find((el: IOption) => el.name === item.name)) {
      const newOpt = options.filter((el: IOption) => el.name !== item.name);
      setOptions(newOpt);
      return;
    }

    setOptions((prevState) => [...prevState, item]);
  }

  function handleProduct() {
    const itemCart: ICart = {
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      options: options,
      category: product.grupo,
      quantity: qtt,
      total: product.price * qtt,
      observation: obs,
    };

    incrementItemCart(itemCart);
    router.back();
  }

  useEffect(() => {
    if(!product.code && !localStorage.getItem("product")) router.push("/cardapio")

    fetch(product.options)
      .then((res) => res.json())
      .then((data) => setNewOptions(data));
  }, [product]);

  return product.code ? (
    <div className="w-full">
      <section className="relative">
        <Back />
        <div
          className="m-auto w-full "
          style={{
            height: "300px",
          }}
        >
          <Image
            // className="m-auto w-full"
            layout="fill"
            objectFit="contain"
            src={product.image}
            alt={`imagem ilustrativa do prato de ${product.name}`}
          />
        </div>
      </section>
      <section className="mt-2 px-6 overflow-y-scroll">
        <h2 className="uppercase text-xl  font-bold">{product.name}</h2>
        <p className="text-md  my-4 mx-2">{product.description}</p>
        {newOptions.length > 0 && (
          <>
            <h3 className="mt-8 mb-4 font-medium">Adicionais</h3>
            <div className="max-h-40  ml-3">
              {newOptions.map((item: any, index: any) => (
                <div key={item.id} className="flex items-center gap-2 mb-3">
                  <input
                    className="w-5 h-5 rounded-md border border-black accent-primary-color"
                    type="checkbox"
                    value={item.nome}
                    id={item.nome}
                    title={item.nome}
                    name="details"
                    onClick={() =>
                      handleOptions({ name: item.nome, id: item.id })
                    }
                  />{" "}
                  <label htmlFor={item.nome}>{item.nome}</label>
                </div>
              ))}
            </div>
          </>
        )}
        {/* <h3 className="mt-8 mb-4 font-medium text-left">Observação</h3>
        <textarea
          className="w-full min-h-24 p-4 border rounded-xl outline-none "
          placeholder="Insira uma observação ao seu pedido. Ex: Não adicionar oregano a receita."
          value={obs}
          onChange={(ev) => setObs(ev.target.value)}
        /> */}
      </section>
      <section className="my-6 px-6 flex gap-11">
        <div className="flex items-center gap-4">
          <button onClick={decremment} className="text-3xl font-medium">
            -
          </button>
          <span>{qtt}</span>
          <button
            onClick={incremment}
            className="text-3xl font-medium text-primary-color"
          >
            +
          </button>
        </div>
        <button
          className="uppercase p-4 bg-primary-color w-full text-white text-lg rounded-lg font-bold text-center"
          onClick={handleProduct}
        >
          Adicionar R$
          {transformPricePTBR(product.price * qtt)}
        </button>
      </section>
    </div>
  ) : null;
}
