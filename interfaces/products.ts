import { ValidSizes, ValidTypes, ISizes, ITypes } from "@/types";



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
    gender     : 'men' | 'women' | 'kid' | 'unisex'
}

export interface IProduct {
    _id        : string;
    description: string;
    images     : string[];
    inStock    : number;
    price      : number;
    sizes      : ISizes[];
    slug       : string;
    tags       : string[];
    title      : string;
    type       : ITypes;
    gender     : 'men' | 'women' | 'kid' | 'unisex'
}
