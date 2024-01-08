import express from "express";
import skillController from "../controller/skillController.js";

export const routerSkill = express.Router();

routerSkill.post("/skill", skillController.post);

routerSkill
  .route("/skills/:id")
  .put(skillController.put)
  .delete(skillController.remove);
