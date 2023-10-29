import { ICartProduct } from "@/interfaces";
import { createContext } from "react";
import { IOrderSummary } from ".";

interface ContextProps extends IOrderSummary {
  cart             : ICartProduct[];
  addProductToCart : (product: ICartProduct) => void;
  updateQuantity   : (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
