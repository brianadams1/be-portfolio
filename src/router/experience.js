import express from "express";
import experienceController from "../controller/experienceController.js";

export const routerExperience = express.Router();

routerExperience.post("/experience", experienceController.post);

routerExperience
  .route("/experience/:id")
  .put(experienceController.put)
  .delete(experienceController.remove);
