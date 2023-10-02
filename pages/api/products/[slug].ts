import { db } from "@/database";
import { IProduct } from "@/interfaces";
import Product from "@/models/Products";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IProduct;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getProductBySlug(req, res);

    default:
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Bad Request",
      });
  }
}

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();

  const { slug } = req.query;

  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Producto no encontrado",
    });
  }

  return res.status(StatusCodes.OK).json(product);
};
