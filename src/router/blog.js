import express from "express";
import blogController from "../controller/blogController.js";

const routerBlogs = express.Router();

// GET METHOD BLOGS
routerBlogs.get("/blogs/:id", blogController.get);

// POST METHOD BLOGS
routerBlogs.post("/blogs/:id", blogController.post);

// PUT METHOD BLOGS
routerBlogs.put("/blogs/:id", blogController.put);

// PATCH METHOD BLOGS
routerBlogs.patch("/blogs/:id", blogController.patch);

// DELETE METHOD BLOGS
routerBlogs.delete("/blogs/:id", blogController.remove);

export { routerBlogs };
