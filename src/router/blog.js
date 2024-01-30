import express, { Router } from "express";
import multer from "multer";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();
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
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage: storage });

// SAVE NEW BLOG
routerBlogs.post("/blog", upload.array("photos", 10), blogController.post);

// UPDATE TITLE ONLY
routerBlogs.patch("/update_blog_title/:id", blogController.updateTitle);

routerBlogs
  .route("/blog/:id")
  .put(upload.array("photos", 10), blogController.put) // update by id
  .delete(blogController.remove); // remove by id

export { routerBlogs };
