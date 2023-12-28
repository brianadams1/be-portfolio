import express from "express";
import skillController from "../controller/skillController.js";

export const routerSkill = express.Router();

routerSkill
  .route("/skills")
  .get(skillController.get)
  .post(skillController.post);

routerSkill
  .route("/skills/:id")
  .put(skillController.put)
  .patch(skillController.patch)
  .delete(skillController.remove);
