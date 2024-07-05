"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { ICategory } from "@/utils/interfaces";

export const CategoriesMap = () => {
  const { categories, getProductsFilter } = useAppContext();
  const [cat, setCat] = useState<String>("");

  function handlerButton(category: String) {
    if (category === cat && category !== "") {
      setCat("");
      return getProductsFilter("");
    }
    setCat(category);
    return getProductsFilter(category.toString());
  }

  return categories.length > 0 ? (
    <div className="flex gap-8 overflow-x-scroll py-2 pl-2 scrollbar-hide">
      {categories.map((category: ICategory, index) => (
        <div className="flex flex-col items-center w-24" key={index}>
          <button
            onClick={() => handlerButton(category.grupo)}
            className={`p-2 rounded-xl w-16 h-16 bg-card-bg mb-2 ${
              cat === category.grupo
                ? "focus:ring focus:ring-secundary-color focus:bg-secundary-color-op1"
                : ""
            } `}
          >
            <img
              className="w-full h-full"
              src={`/categorias/${category.grupo}.png`}
              alt=""
            />
          </button>
          <p className="text-xs uppercase text-center">{category.grupo}</p>
        </div>
      ))}
    </div>
  ) : null;
};
