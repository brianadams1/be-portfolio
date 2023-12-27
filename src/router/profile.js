import express from "express";

const routerProfile = express.Router();
const profileMessage = { message: "OK from Profile Page", status: 200 };


// GET METHOD PROFILE
routerProfile.get("/profile/:id", (req, res) => {
  res.status(200).json(profileMessage);
});

// POST METHOD  PROFILE
routerProfile.post("/profile/:id", (req, res) => {
  res.status(200).json(profileMessage);
});

// PUT METHOD PROFILE
routerProfile.put("/profile/:id", (req, res) => {
  res.status(200).json(profileMessage);
});

// PATCH METHOD PROFILE
routerProfile.patch("/profile/:id", (req, res) => {
  res.status(200).json(profileMessage);
});

// DELETE METHOD PROFILE
routerProfile.delete("/profile/:id", (req, res) => {
  res.status(200).json(profileMessage);
});

export { routerProfile };
