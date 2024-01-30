import express from "express";
import fileService from "../service/fileService.js";
import profileController from "../controller/profileController.js";

export const routerProfile = express.Router();

routerProfile.put(
  "/profile",
  fileService.upload.single("avatar"),
  profileController.put
); //update profile with avatar
