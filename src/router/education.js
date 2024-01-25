import express from "express";
import educationController from "../controller/educationController.js";

const routerEducation = express.Router();

routerEducation.post("/education", educationController.post);

routerEducation
  .route("/education/:id")
  .put(educationController.put)
  .delete(educationController.remove);

export { routerEducation };
