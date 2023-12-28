import express from "express";
import projectController from "../controller/projectController.js";

const routerProject = express.Router();

routerProject
  .route("/projects")
  .get(projectController.get)
  .post(projectController.post);

routerProject
  .route("/projects/:id")
  .put(projectController.put)
  .patch(projectController.patch)
  .delete(projectController.remove);

export { routerProject };
