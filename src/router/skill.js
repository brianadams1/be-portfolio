import express from "express";
import skillController from "../controller/skillController.js";

export const routerSkill = express.Router();

// GET METHOD SKILLS
routerSkill.get("/skills", skillController.get);

// POST METHOD SKILLS
routerSkill.post("/skills", skillController.post);

// PUT METHOD SKILLS
routerSkill.put("/skills/:id", skillController.put);

// PATCH METHOD SKILLS
routerSkill.patch("/skills/:id", skillController.patch);

// DELETE METHOD SKILLS
routerSkill.delete("/skills/:id", skillController.remove);
