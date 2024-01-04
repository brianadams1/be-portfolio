import express  from "express";
import blogController from "../controller/blogController.js";

export const routerPublic = express.Router()

// get all blogs
routerPublic.get('/blogs', blogController.getAll)

// get blog by id
routerPublic.get('/blog/:id', blogController.get)
