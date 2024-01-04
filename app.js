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
import { Prisma } from "./src/app/prisma.js";
import jwt from "jsonwebtoken";

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware
app.use(logging);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAGE_PATHING START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// PUBLIC API (WITHOUT LOGIN)
app.use(routerPublic);

// MIDDLEWARE FOR AUTHENTICATION
app.use(async (req, res, next) => {
  try {
    // CHECK COOKIE TOKEN
    const token = req.cookies.token;

    // IF NO TOKEN, GO TO CATCH_ERROR
    if (!token) throw new Error();

    // CHECK TOKEN OWNER
    const user = await Prisma.user.findFirst({
      where: { token },
      select: { name: true, email: true, token: true },
    });

    // IF USER NOT FOUND, CLEAR COOKIE AND GO TO CATCH_ERROR
    if (!user) {
      res.clearCookie("token");
      throw new Error();
    }

    // USER FOUND, CHECK IS TOKEN VERIFY USING JWT
    const jwtSecret = "BASECOOKIEFROMWEBSITE";

    // IF JWT ERROR, THROW ERROR AUTOMATICALLY
    jwt.verify(token, jwtSecret);

    // RENEW TOKEN
    const maxAge = 3600;
    var newToken = jwt.sign({ email: user.email }, jwtSecret, {
      expiresIn: maxAge,
    });

    await Prisma.user.update({
      where: { email: user.email },
      data: {
        token: newToken,
      },
    });

    // SEND NEW COOKIE TO CLIENT/BROWSER
    res.cookie("token", newToken);

    // IF OK, NEXT
    next();
  } catch (error) {
    // IF NOT, RETURN 401 UNAUTHORIZED
    return res.status(401).json({
      message: "Unauthorized. You must login first",
    });
  }
});

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
