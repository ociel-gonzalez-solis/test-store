import { ICartProduct } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  cart             : ICartProduct[];
  addProductToCart : (product: ICartProduct) => void;
  updateQuantity   : (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
