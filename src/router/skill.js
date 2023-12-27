import express from "express";

export const routerSkill = express.Router();
const skillsMessage = { message: "OK from Skills Page", status: 200 };

// GET METHOD SKILLS
routerSkill.get("/skills", (req, res) => {
    res.status(200).json(skillsMessage);
  });
  
  // POST METHOD SKILLS
  routerSkill.post("/skills", (req, res) => {
    res.status(200).json(skillsMessage);
  });
  
  // PUT METHOD SKILLS
  routerSkill.put("/skills", (req, res) => {
    res.status(200).json(skillsMessage);
  });
  
  // PATCH METHOD SKILLS
  routerSkill.patch("/skills", (req, res) => {
    res.status(200).json(skillsMessage);
  });
  
  // DELETE METHOD SKILLS
  routerSkill.delete("/skills", (req, res) => {
    res.status(200).json(skillsMessage);
  });