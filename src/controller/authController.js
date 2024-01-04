import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// POST METHOD  LOGIN
const login = async (req, res, next) => {
  try {
    // ambil data body ->email & password
    let loginData = req.body;
    loginData = Validate(loginValidation, loginData);

    // check email betul atau salah
    const user = await Prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    // jika email salah
    if (!user) throw new ResponseError(400, `Email or password is invalid`);

    //check password betul atau salah
    const clientPassword = loginData.password;
    const dbPassword = user.password;
    const checkPassword = await bcrypt.compare(clientPassword, dbPassword);

    // jika password salah
    if (!checkPassword)
      throw new ResponseError(400, `Email or password is invalid`);

    // jika email dan password benar
    const jwtSecret = process.env.JWT_SECRET;
    const maxAge = 3600;
    let token = jwt.sign(
      {
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    // PUT TOKEN
    res.cookie("token", token);

    // SEND USER-NEED DATA, put token
    const data = await Prisma.user.update({
      where: {
        email: loginData.email,
      },
      data: {
        token: token,
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json({
      message: "Logged in",
      data: data,
      checkPassword: checkPassword,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD LOGOUT

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("username");
    res.clearCookie("location");

    res.status(200).json({
      message: "Cookies cleared",
    });
  } catch (error) {
    next();
  }
};

export default { login, logout };
