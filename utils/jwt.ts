import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string): string => {
  if (!process.env.JWT_SECRETE_SEED) {
    throw new Error("NO hay semilla de JWT - Revisar variables de entorno");
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRETE_SEED, {
    expiresIn: "30d",
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRETE_SEED) {
    throw new Error("NO hay semilla de JWT - Revisar variables de entorno");
  }

  if (token.length <= 10) return Promise.reject('JWT no es valido');

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRETE_SEED || "", (err, payload) => {
        if (err) return reject("JWT no es valido");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      return reject("JWT no es valido");
    }
  });
};
