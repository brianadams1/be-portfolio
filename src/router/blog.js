import express, { Router } from "express";
import blogController from "../controller/blogController.js";
import fileService from "../service/fileService.js";

export const routerBlogs = express.Router();

// SAVE NEW BLOG
routerBlogs.post(
  "/blog",
  fileService.upload.array("photos", 10),
  blogController.post
);

// UPDATE TITLE ONLY
routerBlogs.patch("/update_blog_title/:id", blogController.updateTitle);

routerBlogs
  .route("/blog/:id")
  .put(fileService.upload.array("photos", 10), blogController.put) // update by id
  .delete(blogController.remove); // remove by id
