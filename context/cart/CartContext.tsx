import { ICartProduct } from "@/interfaces";
import { createContext } from "react";
import { IOrderSummary, IShippingAddress } from ".";

interface ContextProps extends IOrderSummary {
cart            : ICartProduct[];
numberOfItems   : number;
subTotal        : number;
tax             : number;
total           : number;
isLoaded        : boolean;
shippingAddress?: IShippingAddress

addProductToCart : (product: ICartProduct) => void;
updateQuantity   : (product: ICartProduct) => void;
removeCartProduct: (product: ICartProduct) => void;
updateAddress    : (address: IShippingAddress) => void

}

export const CartContext = createContext({} as ContextProps);
