import { ICartProduct, IOrderSummary, IShippingAddress } from "@/interfaces";
import { ICartState } from ".";

type CartActionType =
    | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change product quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
    | { type: '[Cart] - Update order summary', payload: IOrderSummary }
    | { type: '[Cart] - Load address from cookies', payload: IShippingAddress }
    | { type: '[Cart] - Update Address', payload: IShippingAddress }

export const cartReducer = (state: ICartState, action: CartActionType): ICartState => {
    switch (action.type) {

        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart    : action.payload
            }

        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - Change product quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    return action.payload;
                })
            }

        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter(
                    p => p._id !== action.payload._id && p.size !== action.payload.size
                )
            }

        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

            case '[Cart] - Update Address':
            case '[Cart] - Load address from cookies':
                return {
                    ...state,
                    shippingAddress: action.payload
                }

        default:
            return state
    }
}
