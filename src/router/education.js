import express from "express";

const routerEducation = express.Router();
const educationsMessage = { message: "OK from Educations Page", status: 200 };

// GET METHOD EDUCATIONS
routerEducation.get("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// POST METHOD EDUCATIONS
routerEducation.post("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// PUT METHOD EDUCATIONS
routerEducation.put("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// PATCH METHOD EDUCATIONS
routerEducation.patch("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// DELETE METHOD EDUCATIONS
routerEducation.delete("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

export { routerEducation };
