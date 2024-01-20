import express from "express";
import experienceController from "../controller/experienceController.js";

export const routerExperience = express.Router();

routerExperience.post("/skill", experienceController.post);

routerExperience
  .route("/skill/:id")
  .put(experienceController.put)
  .delete(experienceController.remove);
