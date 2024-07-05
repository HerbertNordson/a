"use client";
import Image from "next/image";
import { Ancor } from "@/components/ancor";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ICart, IOption } from "@/utils/interfaces";
import del from "@/assets/delete.svg";
import { transformPricePTBR } from "@/utils/scripts";
import { SectionTitle } from "@/components/sectionTitle";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, decrementItemCart } = useAppContext();
  const router = useRouter();

  return (
    <>
      <Header />
      <section className="flex flex-col justify-between w-full min-h-96 px-6 lg:w-4/5 lg:m-auto">
        <div>
          <SectionTitle label="MEU CARRINHO" size="text-2xl" />
          <div className="bg-card-bg rounded-lg rounded-s-none p-4 border-l-4 border-l-primary-color">
            <div className="max-h-60 overflow-y-scroll scrollbar-hide ">
              {cart.length > 0 ? (
                cart.map((item: ICart, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="w-3/5">
                      <p className="text-md ">
                        {item.quantity}x -{" "}
                        <span className="uppercase">{item.name}</span>
                      </p>
                      <div className="flex gap-1 flex-wrap">
                        {item.options?.map((option: IOption) => (
                          <p className="text-xs text-subtitle" key={option.id}>
                            {option.name + ", "}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-bold ">
                        R$ {transformPricePTBR(item.total)}
                      </span>
                      <Image
                        src={del}
                        alt=""
                        onClick={() => decrementItemCart(item)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xl p-4">
                  Nenhum item foi adicionado ao carrinho.
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            router.back();
          }}
          className={`bg-primary-color uppercase w-full font-bold text-center p-6 rounded-2xl border-2 border-none bg-white text-primary-color`}
        >
          Voltar
        </button>
      </section>
      <Footer url="autenticacao" label="finalizar" />
    </>
  );
}
