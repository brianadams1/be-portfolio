import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerBlogs } from "./src/router/blog.js";
import { routerProject } from "./src/router/project.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";
import { notFound } from "./src/router/notfound.js";
import { logging } from "./src/middleware/logging.js";
import { errorAgain } from "./src/middleware/error.js";

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware
app.use(logging);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const homeMessage = { message: "OK from Home page", status: 200 };

// ------------ HOME -------------- (now useless)

// GET METHOD HOME
// app.get("/", (req, res) => {
//   res.status(200).json(homeMessage);
// });

// ---------- PROFILE -----------

app.use(routerProfile);

// -------------- EDUCATIONS ----------------

app.use(routerEducation);

// --------------- BLOGS -------------------

app.use(routerBlogs);

// ---------- PROJECTS -----------

app.use(routerProject);

// ---------- SKILLS ----------

app.use(routerSkill);

// ---------- LOGIN & LOGOUT -----------

app.use(routerAuth);

// ------------- 404 MIDDLEWARE -----------------

app.use(notFound);

// =============== ERROR MIDDLEWARE =====================

app.use(errorAgain);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const port = process.env.PORT || 5000;
console.info(port);
app.listen(5000, () => {
  console.info(`App is running in localhost:${port}`);
});
