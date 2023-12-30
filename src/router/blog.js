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
  .route("/blogs/:id")
  .put(blogController.put)
  .patch(blogController.patch)
  .delete(blogController.remove);

export { routerBlogs };
