"use client";
import { useAppContext } from "@/context";
import { IFooter } from "@/utils/interfaces";
import { transformPricePTBR } from "@/utils/scripts";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Footer = ({ label, url }: IFooter) => {
  const { cart } = useAppContext();
  const route = useRouter();

  const total = () => {
    if (cart.length === undefined) return 0;

    let newTotal: number = 0;
    for (let item in cart) {
      newTotal += cart[item].total;
    }

    return newTotal;
  };

  function handleClick() {
    if (location.href.includes("/carrinho")) {
      if (cart.length > 0) {
        return route.push("/autenticacao");
      } else {
        return route.push("#");
      }
    }

    route.push(url);
  }

  return (
    <footer className="w-full bg-white fixed inset-x-0 bottom-0 lg:w-4/5 lg:m-auto">
      <div className="flex justify-around items-center mb-4 pt-4">
        <p className="text-2xl font-medium">Total do pedido</p>{" "}
        <span className="text-3xl text-success font-bold">
          R$ {transformPricePTBR(total())}
        </span>
      </div>
      <button
        onClick={handleClick}
        className="bg-primary-color text-center text-white font-bold w-full p-4 uppercase border-0 outline-offset-0"
      >
        {label}
      </button>
    </footer>
  );
};
