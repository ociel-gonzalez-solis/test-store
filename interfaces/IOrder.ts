import { ISize } from "@/types";
import { IUser } from ".";

export interface IOrderSummary {
    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
}

export interface IOrder extends IOrderSummary {
    _id            ?: string;
    user           ?: IUser | string;
    orderItems      : IOrderItems[];
    shippingAddress : IShippingAddress;
    paymentResult  ?: string;
    isPaid          : boolean;
    paidAt         ?: string;
}

export interface IOrderItems {
    _id     : string;
    title   : string;
    size    : ISize;
    quantity: number;
    slug    : string;
    images  : string;
    price   : number;
    gender  : string;
}

export interface IShippingAddress {
    firstName : string;
    lastName  : string;
    address   : string;
    address2 ?: string;
    zip       : string;
    city      : string;
    country   : string;
    phone     : string;
}