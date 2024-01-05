import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Prisma } from "../app/prisma.js";
dotenv.config();

const createToken = (res, email) => {
  // create token
  const jwtSecret = process.env.JWT_SECRET;
  const maxAge = 3600;
  let token = jwt.sign(
    {
      email: email,
    },
    jwtSecret,
    {
      expiresIn: maxAge,
    }
  );
  // SEND RES COOKIE
  res.cookie("token", token);
  return token;
};
const updateUserToken = async(email, token) => {
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
        },
      });
    return user
};
export default {
  createToken,
  updateUserToken,
};
