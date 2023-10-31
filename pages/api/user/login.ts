import { db } from "@/database";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { customJWT } from "@/utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Debe de especificar query para la busqueda" });
      break;
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Correo o password no validos - EMAIL" });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Correo o password no validos - PASSWORD" });
  }

  const { role, name, _id } = user;

  const token = customJWT.signToken(_id, email);

  return res.status(StatusCodes.OK).json({
    token: token,
    user : {
      email,
      role,
      name,
    },
  });
};
