import express from "express";
import authController from "../controller/authController.js";

export const routerAuth = express.Router(); 
routerAuth.delete("/logout", authController.logout);
routerAuth.get('/user', authController.get)
routerAuth.put('/user', authController.put)
