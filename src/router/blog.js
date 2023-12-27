import express from "express";

const routerBlogs = express.Router();
const blogsMessage = { message: "OK from Blogs Page", status: 200 };

// GET METHOD BLOGS
routerBlogs.get("/blogs/id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// POST METHOD BLOGS
routerBlogs.post("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// PUT METHOD BLOGS
routerBlogs.put("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// PATCH METHOD BLOGS
routerBlogs.patch("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// DELETE METHOD BLOGS
routerBlogs.delete("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

export { routerBlogs };
