import express from "express";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();

// GET ALL BLOGS
routerBlogs.get("/blogs", blogController.getAll)
// GET BLOG BY ID
routerBlogs.get('/blog/:id',blogController.get)
// SAVE NEW BLOG
routerBlogs.post('/blog',blogController.post);

routerBlogs
  .route("/blog/:id")
  .put(blogController.put)
  .delete(blogController.remove);

routerBlogs.patch('/update_blog_title/:id', blogController.updateTitle)

export { routerBlogs };
