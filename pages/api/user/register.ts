import { db } from "@/database";
import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { customJWT, validations } from "@/utils";

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
      return registerUser(req, res);
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Debe de especificar query para la busqueda" });
      break;
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email    = "",
    password = "",
    name     = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Password debe de ser minimo de 5 caracteres" });
  }

  if (name.length < 2) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "El nombre debe de ser minimo 2 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "El correo no es valido" });
  }

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Correo ocupado" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Revisar logs del servidor" });
  }

  const { _id, role } = newUser;

  const token = customJWT.signToken(_id, email);

  return res.status(StatusCodes.OK).json({
    token: token,
    user: {
      email,
      role,
      name,
    },
  });
};
