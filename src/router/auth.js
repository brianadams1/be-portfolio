import express from "express";

export const routerAuth = express.Router();

// POST METHOD  LOGIN
routerAuth.post("/login", (req, res) => {
    res.cookie("token", "askdjbajfdlajsda");
    res.cookie("username", "troll1234");
    res.cookie("location", "Jakarta");
  
    res.status(200).json({
      message: "Logged in",
    });
  });
  
  // ----------- LOGOUT ----------
  
  // DELETE METHOD LOGOUT
  routerAuth.delete("/logout", (req, res) => {
    res.clearCookie("token");
    res.clearCookie("username");
    res.clearCookie("location");
  
    res.status(200).json({
      message: "Cookies cleared",
    });
  });
  