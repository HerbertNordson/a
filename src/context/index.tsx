"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IProvider, IUserContext } from "./interface";
import { ICart, ICategory, IDish } from "@/utils/interfaces";

const AppContext = createContext<IUserContext>({} as IUserContext);

export const AppProvider: React.FC<IProvider> = ({ children }) => {
  const [categories, setCategories] = useState<Array<ICategory>>(
    {} as Array<ICategory>
  );
  const [products, setProducts] = useState<Array<IDish>>({} as Array<IDish>);
  const [productsFilter, setProductsFilter] = useState<Array<IDish>>(
    {} as Array<IDish>
  );
  const [cart, setCart] = useState<Array<ICart>>([] as Array<ICart>);
  const [product, setProduct] = useState<IDish>({} as IDish);
  const [table, setTable] = useState<number>(0);
  const [hasTable, setHasTable] = useState<boolean>(false);
  const [pdv, setPdv] = useState<number>(0);
  const [hasPdv, setHasPdv] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Category events
  const getCategories = () => {
    const cat: Array<String> = products.map((cats: IDish) => cats.grupo);
    const arraySemDuplicados = cat.filter((valor, indice, self) => {
      return self.indexOf(valor) === indice;
    });

    const cats: Array<ICategory> = arraySemDuplicados.map((item) => {
      return { grupo: item, image: "" };
    });

    setCategories(cats);
  };

  const getProductsFilter = async (category: String) => {
    if (category === "") return setProductsFilter(products);

    const listFilter: Array<IDish> = products.filter(
      (item: IDish) => item.grupo === category
    );
    return setProductsFilter(listFilter);
  };

  // Products events
  const getProducts = (pdv: number) => {
    fetch("/api/catalog?pdv=" + pdv)
      .then((res) => res.json())
      .then((data) => {
        const resp = data.map((item: any) => {
          return {
            code: item.id,
            grupo: item.grupo,
            name: item.nome,
            description: item.nome,
            price: item.preco,
            image: item.image,
            options: item.extras,
          };
        });
        setProductsFilter(resp);
        setLoading(false);
        return setProducts(resp);
      })
      .catch((err) => {
        return setProducts([]);
      });
  };

  //Cart events
  const incrementItemCart = (item: ICart) => {
    const persistCart = localStorage.getItem("cart");
    if (!persistCart) localStorage.setItem("cart", JSON.stringify(item));

    if (persistCart) {
      const convertPersist = JSON.parse(persistCart);
      if (convertPersist.length > 0) {
        const data = convertPersist.map((item: ICart) => item);
        data.push(item);
        localStorage.setItem("cart", JSON.stringify(data));
      } else {
        const data = [];
        data.push(convertPersist, item);
        localStorage.setItem("cart", JSON.stringify(data));
      }
    }

    setCart((prev) => [...prev, item]);
  };

  const decrementItemCart = (item: ICart) => {
    const newCart = cart.filter((el: ICart, index) => el !== item);
    localStorage.setItem("cart", JSON.stringify(newCart));
    if (newCart.length < 1) localStorage.removeItem("cart");
    setCart(newCart);
  };

  // EVENTS PARAMS

  //Table
  const setValueTable = (value: number) => {
    setTable(value);
    return setHasTable(!hasTable);
  };

  //PDV
  const setValuePDV = (value: number) => {
    setPdv(value);
    return setHasPdv(!hasPdv);
  };

  useEffect(() => {
    if (!product.code) {
      const data = localStorage.getItem("product");
      if (data) {
        const newData = JSON.parse(data);
        setProduct(newData);
      }
    }

    if (cart.length === 0 && localStorage.getItem("cart")) {
      const data = localStorage.getItem("cart");
      if (data) {
        const newData = JSON.parse(data);
        setCart([...cart, newData]);
      }
    }

    if (!table || !pdv) {
      const pdvLocal = localStorage.getItem("pdv") ?? 0;
      const tableLocal = localStorage.getItem("table") ?? 0;

      if (pdvLocal) setPdv(Number(pdvLocal));
      if (tableLocal) setTable(Number(tableLocal));
    }

    if (products.length === undefined && pdv !== 0) {
      setLoading(true);
      getProducts(pdv);
    }
    if (products.length > 0 && categories.length === undefined) getCategories();
  }, [products, categories, cart, product, table, pdv]);

  const value = useMemo(
    () => ({
      categories,
      products,
      product,
      setProduct,
      cart,
      setCart,
      table,
      setTable,
      pdv,
      setPdv,
      error,
      setError,
      loading,
      setLoading,
      productsFilter,
      getProductsFilter,
      incrementItemCart,
      decrementItemCart,
      setValueTable,
      setValuePDV,
    }),
    [
      categories,
      products,
      product,
      setProduct,
      cart,
      setCart,
      table,
      setTable,
      pdv,
      setPdv,
      error,
      setError,
      loading,
      setLoading,
      productsFilter,
      getProductsFilter,
      incrementItemCart,
      decrementItemCart,
      setValueTable,
      setValuePDV,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

export const useAppContext = () => useContext(AppContext);
