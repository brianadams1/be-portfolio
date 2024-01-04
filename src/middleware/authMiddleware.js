import jwt from "jsonwebtoken";
import { Prisma } from "../app/prisma.js";

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
    const jwtSecret = "BASECOOKIEFROMWEBSITE";

    // IF JWT ERROR, THROW ERROR AUTOMATICALLY
    jwt.verify(token, jwtSecret);

    // RENEW TOKEN
    const maxAge = 3600;
    var newToken = jwt.sign({ email: user.email }, jwtSecret, {
      expiresIn: maxAge,
    });

    await Prisma.user.update({
      where: { email: user.email },
      data: {
        token: newToken,
      },
    });

    // SEND NEW COOKIE TO CLIENT/BROWSER
    res.cookie("token", newToken);

    // IF OK, NEXT
    next();
  } catch (error) {
    // IF NOT, RETURN 401 UNAUTHORIZED
    return res.status(401).json({
      message: "Unauthorized. You must login first",
    });
  }
};
