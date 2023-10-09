import Product from "@/models/Products";
import { db } from "."
import { IProduct } from "@/interfaces";

interface IProductSlug {
    slug: string;
}

export const getProductBySlot = async (slug: string): Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
}

export const getAllProductsBySlot = async (): Promise<IProductSlug[]> => {
    await db.connect();
    const slug = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slug;
}