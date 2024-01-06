import express from "express";
import profileController from "../controller/profileController.js";

export const routerProfile = express.Router();

routerProfile.put('/profile',profileController.put); //update profile
