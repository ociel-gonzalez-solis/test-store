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
    case "GET":
      return checkJWT(req, res);
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Debe de especificar query para la busqueda" });
      break;
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies as { token: string };

  let userIDd = "";

  try {
    userIDd = await customJWT.isValidToken(token);
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Token invalido" });
  }

  await db.connect();
  const user = await User.findById(userIDd).lean();
  await db.disconnect();

  if (!user) {
      return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "NO existe el usuario con ese ID" });
  }
  const { _id, email, role, name } = user;

  return res.status(StatusCodes.OK).json({
      token: customJWT.signToken(_id, email),
      user : {
          email,
          role,
          name,
      },
  });
};
