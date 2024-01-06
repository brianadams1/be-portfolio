import express  from "express";
import blogController from "../controller/blogController.js";
import authController from "../controller/authController.js";
import educationController from "../controller/educationController.js";
import profileController from "../controller/profileController.js";
import projectController from "../controller/projectController.js";

export const routerPublic = express.Router()

// PUBLIC API - CAN BE ACCESSED WITHOUT LOGIN PROCESS

// LOGIN ===================
routerPublic.post("/login", authController.login);

// BLOGS ===================
// GET ALL
routerPublic.get('/blogs', blogController.getAll)
// GET BY ID
routerPublic.get('/blog/:id', blogController.get)

// EDUCATIONS =================
// GET ALL
routerPublic.get("/educations", educationController.getAll);
// GET BY ID
routerPublic.get("/educations/:id", educationController.get);

// PROFILE ===================
// GET
routerPublic.get("/profile", profileController.get)

// PROJECT ======================
// GET ALL
routerPublic.get("/projects", projectController.getAll)
// GET BY ID
routerPublic.get("/project/:id", projectController.get)


// SKILL ========================