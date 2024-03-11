import express from "express";
import blogController from "../controller/blogController.js";
import authController from "../controller/authController.js";
import educationController from "../controller/educationController.js";
import profileController from "../controller/profileController.js";
import projectController from "../controller/projectController.js";
import skillController from "../controller/skillController.js";
import experienceController from "../controller/experienceController.js";

export const routerPublic = express.Router();

// PUBLIC API - CAN BE ACCESSED WITHOUT LOGIN PROCESS

// AUTH
routerPublic.post("/first-user", authController.createFirstUser);

// LOGIN ===================
routerPublic.post("/login", authController.login);

// BLOGS ===================
// GET ALL
routerPublic.get("/blogs", blogController.getAll);
// GET BY ID
routerPublic.get("/blog/:id", blogController.get);

// EDUCATIONS =================
// GET ALL
routerPublic.get("/educations", educationController.getAll);
// GET BY ID
routerPublic.get("/education/:id", educationController.get);

// PROFILE ===================
// GET
routerPublic.get("/profile", profileController.get);
routerPublic.get("/portfolio", profileController.portfolio);

// PROJECT ======================
// GET ALL
routerPublic.get("/projects", projectController.getAll);
// GET BY ID
routerPublic.get("/project/:id", projectController.get);

// SKILL ========================
routerPublic.get("/skills", skillController.getAll);
// GET BY ID
routerPublic.get("/skill/:id", skillController.get);
// GET BY CATEGORY
routerPublic.get("/skill_by_category", skillController.getSkillByCategory);
// GET CATEGORIES
routerPublic.get("/skill_categories", skillController.getAllCategories);

// EXPERIENCE ===================
routerPublic.get("/experiences", experienceController.getAll);
// GET BY ID
routerPublic.get("/experience/:id", experienceController.get);
