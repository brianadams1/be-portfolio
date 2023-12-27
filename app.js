import express from "express";
import cookieParser from "cookie-parser";
import {routerProfile} from './src/router/profile.js'

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware learning >> logging, requst is done?, authentication test.
app.use((req, res, next) => {
  let time = new Date().toLocaleDateString();
  const log = {
    time: time,
    method: req.method,
    path: req.path,
    query: req.query,
    cookies: req.signedCookies,
    protocol: req.protocol,
    body: req.body,
  };
  console.info(log);
  // save to database
  console.log("===============================");
  console.log("Waiting to save log to database");
  next();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const homeMessage = { message: "OK from Home page", status: 200 };
const educationsMessage = { message: "OK from Educations Page", status: 200 };
const blogsMessage = { message: "OK from Blogs Page", status: 200 };
const projectsMessage = { message: "OK from Projects Page", status: 200 };
const skillsMessage = { message: "OK from Skills Page", status: 200 };

// ------------ HOME --------------

// GET METHOD HOME
app.get("/", (req, res) => {
  res.status(200).json(homeMessage);
});

// ---------- PROFILE -----------

app.use(routerProfile)


// -------------- EDUCATIONS ----------------

// GET METHOD EDUCATIONS
app.get("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// POST METHOD EDUCATIONS
app.post("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// PUT METHOD EDUCATIONS
app.put("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// PATCH METHOD EDUCATIONS
app.patch("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// DELETE METHOD EDUCATIONS
app.delete("/educations/:id", (req, res) => {
  res.status(200).json(educationsMessage);
});

// --------------- BLOGS -------------------

// GET METHOD BLOGS
app.get("/blogs/id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// POST METHOD BLOGS
app.post("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// PUT METHOD BLOGS
app.put("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// PATCH METHOD BLOGS
app.patch("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// DELETE METHOD BLOGS
app.delete("/blogs/:id", (req, res) => {
  res.status(200).json(blogsMessage);
});

// ---------- PROJECTS -----------

// GET METHOD PROJECTS
app.get("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// POST METHOD  PROJECTS
app.post("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// PUT METHOD PROJECTS
app.put("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// PATCH METHOD PROJECTS
app.patch("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// DELETE METHOD PROJECTS
app.delete("/projects/:id", (req, res) => {
  res.status(200).json(projectsMessage);
});

// ---------- SKILLS ----------

// GET METHOD SKILLS
app.get("/skills", (req, res) => {
  res.status(200).json(skillsMessage);
});

// POST METHOD SKILLS
app.post("/skills", (req, res) => {
  res.status(200).json(skillsMessage);
});

// PUT METHOD SKILLS
app.put("/skills", (req, res) => {
  res.status(200).json(skillsMessage);
});

// PATCH METHOD SKILLS
app.patch("/skills", (req, res) => {
  res.status(200).json(skillsMessage);
});

// DELETE METHOD SKILLS
app.delete("/skills", (req, res) => {
  res.status(200).json(skillsMessage);
});

// ---------- LOGIN -----------

// POST METHOD  LOGIN
app.post("/login", (req, res) => {
  res.cookie("token", "askdjbajfdlajsda");
  res.cookie("username", "troll1234");
  res.cookie("location", "Jakarta");

  res.status(200).json({
    message: "Logged in",
  });
});

// ----------- LOGOUT ----------

// DELETE METHOD LOGOUT
app.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.clearCookie("location");

  res.status(200).json({
    message: "Cookies cleared",
  });
});

// ERROR MIDDLEWARE
app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.listen(5000, () => {
  console.info(`App is running in localhost:5000`);
});
