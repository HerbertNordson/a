"use client";
import DetailsLayout from "@/app/cardapio/layout";
import { useAppContext } from "@/context";
import { ICart, IDish } from "@/utils/interfaces";
import { transformPricePTBR } from "@/utils/scripts";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const DishMap = () => {
  const { productsFilter, cart, setProduct } = useAppContext();
  const router = useRouter();

  const getAmount = (item: IDish) => {
    const items = cart.map((el: ICart) => el);
    let quantity = 0;
    for (let el in items) {
      if (items[el].code === item.code) {
        quantity += items[el].quantity;
      }
    }

    if (quantity === 0) return null;

    return quantity;
  };

  function handleProduct(dish: IDish) {
    localStorage.setItem("product", JSON.stringify(dish));
    setProduct(dish);
    router.push("/cardapio/detalhes");
  }

  return productsFilter.length > 0 ? (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full ">
        {productsFilter.map((dish: IDish, index: number) => {
          const amount = getAmount(dish);

          return (
            <div
              onClick={() => handleProduct(dish)}
              className="w-full flex flex-col justify-between min-h-44 pt-4 pb-2 px-2 overflow-hidden bg-card-bg rounded-lg hover:border-primary-color border-card-bg border box-border"
              key={index}
            >
              <div>
                <div className=""></div>
                <header className="w-full relative">
                  {amount && (
                    <span className="absolute h-7 w-7 rounded-full bg-red-500 border-2 text-gray-50 text-center top-0 right-0 center">
                      {amount}
                    </span>
                  )}

                  <Image
                    className=" w-32 rounded-lg m-auto"
                    src={dish.image}
                    width="100"
                    height={"100"}
                    alt="prato"
                  />
                </header>
                <main className="min-h-12 mt-4 flex flex-col justify-between">
                  <p className="text-center text-md uppercase font-medium">
                    {dish.name}
                  </p>
                  <p className="text-center text-md text-success font-medium">
                    R$ {transformPricePTBR(dish.price)}
                  </p>
                </main>
              </div>
              {/* <footer className="flex justify-end items-center">
              <button className="bg-success p-2 w-8 h-8 rounded-lg uppercase text-white flex items-center justify-center">
                {hasDish(dish)}
              </button>
            </footer> */}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
