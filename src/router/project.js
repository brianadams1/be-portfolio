import express from "express";
import projectController from "../controller/projectController.js";

export const routerProject = express.Router();

routerProject
  .post("/project",projectController.post);

routerProject
  .route("/projects/:id")
  .put(projectController.put)
  .delete(projectController.remove);