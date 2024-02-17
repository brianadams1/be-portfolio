import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authService from "../service/authService.js";
import { isUser } from "../validation/userValidation.js";
dotenv.config();

// POST METHOD  LOGIN
const login = async (req, res, next) => {
  try {
    // ambil data body ->email & password
    let loginData = req.body;
    const { email, password } = Validate(loginValidation, loginData);

    // check email betul atau salah
    const user = await Prisma.user.findUnique({ where: { email } });

    // jika email salah
    if (!user) throw new ResponseError(400, `Email or password is invalid`);

    //check password betul atau salah

    const dbPassword = user.password;
    const checkPassword = await bcrypt.compare(password, dbPassword);

    // jika password salah
    if (!checkPassword)
      throw new ResponseError(400, `Email or password is invalid`);

    // jika email dan password benar
    // // create token, res param to use in token service
    const token = authService.createToken(res, email);

    // SEND USER-NEED DATA, put token
    const data = await authService.updateUserToken(email, token);

    res.status(200).json(data);
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
      where: { email },
      data: { token: null },
      select: { email: true },
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

const get = async (req, res, next) => {
  try {
    const user = await Prisma.user.findFirstOrThrow({
      select: {
        name: true,
        email: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const put = async (req, res, next) => {
  try {
    // validate
    let user = req.body;
    user = Validate(isUser, user);
    // remove confirm password
    delete user.confirm_password;
    // update password to hash
    user.password = await bcrypt.hash(user.password, 10);
    // find user
    const currentUser = await Prisma.user.findFirstOrThrow();

    const updateUser = await Prisma.user.update({
      where: { email: currentUser.email },
      data: user,
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export default { login, logout, get, put };
