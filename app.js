import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs/promises";

dotenv.config();
import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerBlogs } from "./src/router/blog.js";
import { routerProject } from "./src/router/project.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";
import { notFound } from "./src/middleware/notfound.js";
import { logging } from "./src/middleware/logging.js";
import { errorAgain } from "./src/middleware/errorMiddleware.js";
import { routerPublic } from "./src/router/public.js";
import { routerExperience } from "./src/router/experience.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import fileService from "./src/service/fileService.js";

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware
app.use(logging);

// CREATE FOLDER UPLOADS
fileService.createUploads("./uploads");

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// HANDLE CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// SET STATIC FILE
app.use("/uploads", express.static("./uploads"));

// HANDLE FILE NOT EXIST
app.use("/uploads", async (req, res) => {
  try {
    await fs.access("./uploads" + req.url);
  } catch (error) {
    res.status(404).json({
      message: "File is not found",
    });
  }
});

// PUBLIC API (WITHOUT LOGIN)
app.use(routerPublic);

// MIDDLEWARE FOR AUTHENTICATION
app.use(authMiddleware);
// ROUTER BERIKUTNYA AKAN CHECK AUTHENTICATION

// ------------ HOME -------------- (now useless)

// const homeMessage = { message: "OK from Home page", status: 200 };

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

// ---------- EXPERIENCE --------------

app.use(routerExperience);

// ---------- LOGIN & LOGOUT -----------

app.use(routerAuth);

// ------------- 404 MIDDLEWARE -----------------

app.use(notFound);

// =============== ERROR MIDDLEWARE =====================

app.use(errorAgain);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.info(`App is running in localhost:${port}`);
});
