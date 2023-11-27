import { FC, PropsWithChildren, useEffect, useMemo, useReducer, useRef } from "react";

import Cookie from 'js-cookie';

import { cartReducer, CartContext } from ".";
import { ICartProduct, IOrderSummary, IShippingAddress } from "@/interfaces";
import { soulisStoreApi } from "@/api";
import { IOrder } from '../../interfaces/IOrder';

export interface ICartState extends IOrderSummary {
  cart           : ICartProduct[];
  isLoaded       : boolean;
  shippingAddress?: IShippingAddress;
}

const CART_INITIAL_STATE: ICartState = {
  isLoaded       : false,
  cart           : [],
  numberOfItems  : 0,
  subTotal       : 0,
  tax            : 0,
  total          : 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const isReloading       = useRef<boolean>(true);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || '',
        lastName : Cookie.get("lastName") || '',
        address  : Cookie.get("address") || '',
        address2 : Cookie.get("address2") || '',
        zip      : Cookie.get("zip") || '',
        city     : Cookie.get("city") || '',
        country  : Cookie.get("country") || '',
        phone    : Cookie.get("phone") || '',
      }
      dispatch({
        type   : "[Cart] - Load address from cookies",
        payload: shippingAddress,
      });
    }

  }, [])

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    // Cookie.set('cart', JSON.stringify(state.cart));
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

 const orderSummary = useMemo(() => {
   const numberOfItems = state.cart.reduce(
     (prev, current) => prev + current.quantity,
     0
   );
   const subTotal = state.cart.reduce(
     (prev, current) => prev + current.price * current.quantity,
     0
   );
   const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE ?? 0);

   return {
     numberOfItems,
     subTotal,
     tax  : subTotal * taxRate,
     total: subTotal * (taxRate + 1),
   };
 }, [state.cart]);

  useEffect(() => {
    // const numberOfItems = state.cart.reduce(
    //   (prev, current) => current.quantity + prev,
    //   0
    // );

    // const subTotal = state.cart.reduce(
    //   (prev, current) => (current.price * current.quantity) + prev,
    //   0
    // );

    // const taxRate = +process.env.NEXT_PUBLIC_TAX_RATE! || 0;

    // const orderSummary: IOrderSummary = {
    //   numberOfItems,
    //   subTotal,
    //   tax  : subTotal * taxRate,
    //   total: subTotal * (taxRate + 1),
    // };
    console.log({ orderSummary });
    dispatch({
      type   : "[Cart] - Update order summary",
      payload: orderSummary,
    });
  }, [state.cart]);

  useEffect(() => {
    if (isReloading.current) {
      isReloading.current = false;
    } else {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const productInCartButInDifferenceSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );

    if (!productInCartButInDifferenceSize)
      return dispatch({
        type: "[Cart] - Update products in cart",
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      p.quantity += product.quantity;

      return p;
    });

    dispatch({
      type: "[Cart] - Update products in cart",
      payload: updatedProducts,
    });
  };

  const updateQuantity = (product: ICartProduct) => {
    dispatch({type: '[Cart] - Change product quantity', payload: product})
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Remove product in cart', payload: product });
  };

  const updateAddress = (address: IShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    Cookie.set("phone", address.phone);

    dispatch({
      type   : '[Cart] - Update Address',
      payload: address,
    });
  }

  const createOrder = async() => {
    if (!state.shippingAddress) {
      throw new Error('No hay direccion de entrega');
    }

    const body: IOrder = {
      orderItems     : state.cart.map((p) => ({
          ...p,
          size: p.size!
        })),
      shippingAddress: state.shippingAddress,
      numberOfItems  : state.numberOfItems,
      subTotal       : state.subTotal,
      tax            : state.tax,
      total          : state.total,
      isPaid         : false,
    }

    try {
      const { data } = await soulisStoreApi.post("/orders", body);
      console.log({data});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        // Methods
        addProductToCart,
        updateQuantity,
        removeCartProduct,
        updateAddress,
        // Orders
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
