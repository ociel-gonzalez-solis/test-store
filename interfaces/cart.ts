import { ISize, IGenders } from "@/types";

export interface ICartProduct {
    _id      : string;
    images   : string;
    price    : number;
    size    ?: ISize;
    slug     : string;
    title    : string;
    gender   : IGenders;
    quantity : number;
}