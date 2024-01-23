import express from "express";
import multer from "multer";
import profileController from "../controller/profileController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // date + random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // get file extension
    const ext = file.originalname.split(".").pop();

    // create file name
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)

},
});

const upload = multer({ storage: storage });

export const routerProfile = express.Router();

routerProfile.put("/profile", upload.single("avatar"), profileController.put); //update profile with avatar
