import { prisma } from "../app/prisma.js";

// POST METHOD  LOGIN

const login = async (req, res) => {
  const user = await prisma.user.findMany()
  console.info(user)
  res.cookie("token", "askdjbajfdlajsda");
  res.cookie("username", "troll1234");
  res.cookie("location", "Jakarta");

  res.status(200).json({
    message: "Logged in",
    user: user
  });
  
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
