export interface IButton {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
  url: string;
}

export interface ITitles {
  label: string;
  color?: string;
  size: string;
}

export interface ICategories {
  categories: Array<ICategory>;
}

export interface ICategory {
  grupo: String;
  image: String;
}

export interface IDishes {
  dishes: Array<IDish>;
}

export interface IDish {
  code: number;
  name: string;
  description: string;
  price: number;
  image: any;
  options: any;
  grupo: string;
}

export interface IOption {
  name: string;
  id: number;
}

export interface ICart {
  code: number;
  name: string;
  description: string;
  price: number;
  image: string;
  options?: Array<IOption>;
  category: string;
  quantity: number;
  total: number;
  observation: string;
}

export interface IFooter {
  label: string;
  url: string;
}
