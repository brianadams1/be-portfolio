import express from "express";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();

routerBlogs.route("/blogs").get(blogController.get).post(blogController.post);

routerBlogs
  .route("/blogs/:id")
  .put(blogController.put)
  .patch(blogController.patch)
  .delete(blogController.remove);

export { routerBlogs };
