import { ICart, ICategory, IDish } from "@/utils/interfaces";

export interface IUserContext {
  categories: Array<ICategory>;
  products: Array<IDish>;
  product: IDish;
  setProduct: React.Dispatch<React.SetStateAction<IDish>>;
  productsFilter: Array<IDish>;
  cart: Array<ICart>;
  setCart: React.Dispatch<React.SetStateAction<Array<ICart>>>;
  table: number;
  setTable: React.Dispatch<React.SetStateAction<number>>;
  pdv: number;
  setPdv: React.Dispatch<React.SetStateAction<number>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getProductsFilter: (category: string) => void;
  incrementItemCart: (item: ICart) => void;
  decrementItemCart: (item: ICart) => void;
  setValueTable: (value: number) => void;
  setValuePDV: (value: number) => void;
}

export interface IProvider {
  children: React.ReactNode;
}
