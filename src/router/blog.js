import express from "express";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();

// GET ALL BLOGS
routerBlogs.get("/blogs", blogController.getAll)
// SAVE NEW BLOG
routerBlogs.post('/blog',blogController.post);

routerBlogs
  .route("/blog/:id")
  .get(blogController.get) // get by id
  .put(blogController.put) // update by id
  .delete(blogController.remove); // remove by id

routerBlogs.patch('/update_blog_title/:id', blogController.updateTitle)

export { routerBlogs };
