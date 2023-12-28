import express from "express";
import educationController from "../controller/educationController.js";

const routerEducation = express.Router();

routerEducation
  .route("/educations")
  .get(educationController.get)
  .post(educationController.post);

routerEducation
  .route("/educations/:id")
  .put(educationController.put)
  .patch(educationController.patch)
  .delete(educationController.remove);

export { routerEducation };
