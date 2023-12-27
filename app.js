import express from "express";
import cookieParser from "cookie-parser";
import {routerProfile} from './src/router/profile.js'
import { routerEducation } from "./src/router/education.js";
import { routerBlogs } from "./src/router/blog.js";
import { routerProject } from "./src/router/project.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";

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

// ------------ HOME -------------- (now useless)

// GET METHOD HOME 
// app.get("/", (req, res) => {
//   res.status(200).json(homeMessage);
// });

// ---------- PROFILE -----------

app.use(routerProfile)


// -------------- EDUCATIONS ----------------

app.use(routerEducation)

// --------------- BLOGS -------------------

app.use(routerBlogs)

// ---------- PROJECTS -----------

app.use(routerProject)

// ---------- SKILLS ----------

app.use(routerSkill)

// ---------- LOGIN & LOGOUT -----------

app.use(routerAuth)

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
