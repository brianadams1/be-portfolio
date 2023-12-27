import express from "express";

const routerProject = express.Router();
const projectsMessage = { message: "OK from Projects Page", status: 200 };

// GET METHOD PROJECTS
routerProject.get("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// POST METHOD  PROJECTS
routerProject.post("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// PUT METHOD PROJECTS
routerProject.put("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// PATCH METHOD PROJECTS
routerProject.patch("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// DELETE METHOD PROJECTS
routerProject.delete("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

export { routerProject };
