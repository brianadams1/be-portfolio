import express  from "express";
import blogController from "../controller/blogController.js";
import authController from "../controller/authController.js";

export const routerPublic = express.Router()

routerPublic.post("/login", authController.login);

// get all blogs
routerPublic.get('/blogs', blogController.getAll)

// get blog by id
routerPublic.get('/blog/:id', blogController.get)
