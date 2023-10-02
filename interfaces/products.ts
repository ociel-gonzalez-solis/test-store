import { ValidSizes, ValidTypes, ISize, ITypes, Genders, IGenders } from "@/types";

export interface SeedProduct {
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : ValidSizes[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : ValidTypes;
    gender     : Genders
}

export interface IProduct {
    _id        : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : ISize[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : ITypes;
    gender     : IGenders
    createdAt  : string;
    updatedAt  : string;
}
