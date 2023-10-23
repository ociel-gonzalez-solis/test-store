import { db } from "@/database";
import Product from "@/models/Products";
import { StatusCodes } from "http-status-codes";
import { IProduct } from "@/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct[];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case "GET":
            return searchProducts(req, res);

        default:
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Bad Request",
            });
    }
}

const searchProducts = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    let { q = "" } = req.query;

    if (q.length === 0) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Debe de especificar el query de busqueda" });
    }

    q = q.toString().toLowerCase();
    await db.connect();

    const products = await Product.find({
        $text: { $search: q },
    })
    .select('title images price inStock slug -_id')
    .lean();
    await db.disconnect();

    return res.status(StatusCodes.OK).json(products);
};
