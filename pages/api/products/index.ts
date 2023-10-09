import { db } from "@/database";
import Product from "@/models/Products";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import { IProduct } from "../../../interfaces/products";
import { SHOP_CONSTANTS } from "@/constants";

type Data = { message: string } | IProduct[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getProducts(req, res);

        default:
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad Request",
            });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { gender = 'all' } = req.query;

    let condition = {};

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(gender as string)) {
        condition = { gender }
    }

    await db.connect();
    const products = await Product.find(condition)
        .select("title images price inStock slug -_id")
        .lean();
    await db.disconnect();

    return res.status(StatusCodes.OK).json(products);
};
