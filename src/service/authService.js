import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Prisma } from "../app/prisma.js";
dotenv.config();

const createToken = (res, email, age = process.env.SESSION_AGE) => {
  // create token
  const jwtSecret = process.env.JWT_SECRET;
  // const maxAge =  age ? age : process.env.SESSION_AGE;
  // const maxAge =  age ?? process.env.SESSION_AGE;

  let token = jwt.sign({ email }, jwtSecret, { expiresIn: age });
  let maxAge = 24 * 60 * 60 * 1000;
  // SEND RES COOKIE
  let cookieConfig = {
    httpOnly: true,
    maxAge: maxAge,
  };

  res.cookie("token", token, cookieConfig);
  return token;
};
const updateUserToken = async (email, token) => {
  // DO PRISMA UPDATE AND RETURN USER DATA
  const user = await Prisma.user.update({
    where: { email },
    data: { token },
    select: { name: true, email: true },
  });
  return user;
};

export default {
  createToken,
  updateUserToken,
};
