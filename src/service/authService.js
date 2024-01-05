import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Prisma } from "../app/prisma.js";
dotenv.config();

const createToken = (res, email, age = process.env.SESSION_AGE) => {
  // create token
  const jwtSecret = process.env.JWT_SECRET;
  // const maxAge =  age ? age : process.env.SESSION_AGE;

  let token = jwt.sign(
    {
      email: email,
    },
    jwtSecret,
    {
      expiresIn: age,
    }
  );
  // SEND RES COOKIE
  res.cookie("token", token);
  return token;
};
const updateUserToken = async (email, token) => {
  // DO PRISMA UPDATE AND RETURN USER DATA
  const user = await Prisma.user.update({
    where: {
      email: email,
    },
    data: {
      token: token,
    },
    select: {
      name: true,
      email: true,
      token: true,
    },
  });
  return user;
};

export default {
  createToken,
  updateUserToken,
};
