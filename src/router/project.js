import express from "express";
import projectController from "../controller/projectController.js";


const routerProject = express.Router();

routerProject.get("/projects", projectController.get);

routerProject.post("/projects", projectController.post);

routerProject.put("/projects/:id", projectController.put);

routerProject.patch("/projects/:id", projectController.patch);

routerProject.delete("/projects/:id", projectController.remove);

export { routerProject };
