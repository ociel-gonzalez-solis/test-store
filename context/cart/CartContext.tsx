import { ICartProduct, IOrderSummary, IShippingAddress } from "@/interfaces";
import { createContext } from "react";

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
updateAddress    : (address: IShippingAddress) => void;
createOrder      : () => Promise<void>

}

export const CartContext = createContext({} as ContextProps);
