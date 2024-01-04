import express from "express";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();


// SAVE NEW BLOG
routerBlogs.post('/blog',blogController.post);

routerBlogs
  .route("/blog/:id")
  .put(blogController.put) // update by id
  .delete(blogController.remove); // remove by id

routerBlogs.patch('/update_blog_title/:id', blogController.updateTitle)

export { routerBlogs };
