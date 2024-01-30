import express from "express";
import fileService from "../service/fileService.js";
import projectController from "../controller/projectController.js";

export const routerProject = express.Router();

routerProject.post(
  "/project",
  fileService.upload.array("photos", 10),
  projectController.post
);

routerProject
  .route("/project/:id")
  .put(fileService.upload.array("photos", 10), projectController.put)
  .delete(projectController.remove);
