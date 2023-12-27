import express from "express";
import educationController from '../controller/educationController.js'

const routerEducation = express.Router();

// GET METHOD EDUCATIONS
routerEducation.get("/educations",educationController.get);

// POST METHOD EDUCATIONS
routerEducation.post("/educations",educationController.post);

// PUT METHOD EDUCATIONS
routerEducation.put("/educations/:id",educationController.put);

// PATCH METHOD EDUCATIONS
routerEducation.patch("/educations/:id",educationController.patch);

// DELETE METHOD EDUCATIONS
routerEducation.delete("/educations/:id",educationController.remove);

export { routerEducation };
