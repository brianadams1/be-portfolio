import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authService from "../service/authService.js";
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

    const email = user.email;
    // jika email dan password benar
    // // create token, res param to use in token service
    const token = authService.createToken(res, email);

    // SEND USER-NEED DATA, put token
    const data = await authService.updateUserToken(email, token);

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

const logout = async (req, res) => {
  try {
    // UPDATE USER DATA, AND TOKEN IS NULLED
    const user = req.user;
    const email = user.email;

    await Prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        token: null,
      },
      select: {
        email: true,
      },
    });

    // CREATE 1 SEC TOKEN
    authService.createToken(res, email, "1s");
    // RESET COOKIE
    res.clearCookie("token");
    // SEND DATA SUCCESS
    res.status(200).json({
      message: "SUCCESS LOGOUT",
    });
  } catch (error) {
    next(error);
  }
};

export default { login, logout };
