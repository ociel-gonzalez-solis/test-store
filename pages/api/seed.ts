import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { db, seedDB } from "@/database";
import Product from "@/models/Products";
import User from "@/models/User";

type Data = {
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (process.env.NODE_ENV === "production") {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "No tiene acceso a este servicio" });
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany(seedDB.initialData.users);

    await Product.deleteMany();
    await Product.insertMany(seedDB.initialData.products);

    await db.disconnect();
    return res
        .status(StatusCodes.OK)
        .json({ message: "Proceso realziado correctamente" });
}