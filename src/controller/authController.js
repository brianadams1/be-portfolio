import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bcrypt from "bcrypt"

// POST METHOD  LOGIN
const login = async (req, res, next) => {
  try {
    // ambil data body ->email & password
    let loginData = req.body;
    loginData = Validate(loginValidation, loginData);

    const user = await Prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });
    if (!user) throw new ResponseError(400, `Email or password is invalid`);
    //check password betul atau salah
    const clientPassword = loginData.password
    const dbPassword = user.password
    const checkPassword = await bcrypt.compare(clientPassword, dbPassword)

    if(!checkPassword) throw new ResponseError(400, `Email or password is invalid`)

    // const user = await prisma.user.findMany() >> should use async
    res.cookie("token", "askdjbajfdlajsda");
    res.cookie("username", "troll1234");
    res.cookie("location", "Jakarta");

    res.status(200).json({
      message: "Logged in",
      data: loginData,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD LOGOUT

const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.clearCookie("location");

  res.status(200).json({
    message: "Cookies cleared",
  });
};

export default { login, logout };
