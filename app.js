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
import { notFound } from "./src/middleware/notfound.js";
import { logging } from "./src/middleware/logging.js";
import { errorAgain } from "./src/middleware/error.js";
import { routerPublic } from "./src/router/public.js";

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware
app.use(logging);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// PUBLIC API (WITHOUT LOGIN)
app.use(routerPublic)

// MIDDLEWARE FOR AUTHENTICATION
app.use((req, res, next)=>{
  console.info("enter route blog middleware>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  // CHECK COOKIE TOKEN
  const token = req.cookies.token;
  // IF NO TOKEN, RETURN 401 UNAUTHORIZED
  if(!token) return res.status(401).json({message:"Unauthorized. You must login first."})
  console.log(token)

  // CHECK TOKEN OWNER
  // CHECK IS TOKEN VERIFY
  // IF OK, NEXT
  next()
  // IF NOT, RETURN 401 UNAUTHORIZED

})

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
