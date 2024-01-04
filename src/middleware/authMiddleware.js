import jwt from "jsonwebtoken";
import { Prisma } from "../app/prisma.js";
import dotenv from "dotenv";
import authService from "../service/authService.js";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    // CHECK COOKIE TOKEN
    const token = req.cookies.token;

    // IF NO TOKEN, GO TO CATCH_ERROR
    if (!token) throw new Error();

    // CHECK TOKEN OWNER
    const user = await Prisma.user.findFirst({
      where: { token },
      select: { name: true, email: true, token: true },
    });

    // IF USER NOT FOUND, CLEAR COOKIE AND GO TO CATCH_ERROR
    if (!user) {
      res.clearCookie("token");
      throw new Error();
    }

    // USER FOUND, CHECK IS TOKEN VERIFY USING JWT
    const jwtSecret = process.env.JWT_SECRET;

    // IF JWT ERROR, THROW ERROR AUTOMATICALLY
    jwt.verify(token, jwtSecret);
    const email = user.email;
    // RENEW TOKEN
    // // create token, res param to use in token service
    const newToken = authService.createToken(res, email);

    
    // RENEW TOKEN TO DB USER
    
    const dataUser = await authService.updateUserToken(email, newToken);

    // INSERT NEW DATA USER TO REQUEST
    req.user = dataUser;

    // IF OK, NEXT
    next();
  } catch (error) {
    // IF NOT, RETURN 401 UNAUTHORIZED
    return res.status(401).json({
      message: "Unauthorized. You must login first",
    });
  }
};
