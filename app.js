import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// to read cookies
app.use(cookieParser());
// to read json from body
app.use(express.json());

// middleware learning >> logging
app.use((req, res, next) => {
  let time = new Date().toLocaleDateString();
  const log = {
    time: time,
    method: req.method,
    path: req.path,
    query: req.query,
    cookies: req.cookies,
    protocol: req.protocol,
    body: req.body,
  };
  console.info(log);
  // save to database
  console.log("===============================");
  console.log("Waiting to save log to database");
  next();
});

// GET (TAKE)
// GET METHOD FOR HOME
app.get("/", (req, res) => {
  res.format({
    JSON: () => {
      res.send({
        message: "yo!"
      });
    },
  });
});

// GET METHOD FOR CONTACT
app.get("/contact", (req, res) => {
  res.status(200).format({
    json: () => {
      res.send({
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params,
      });
    },
  });
});

// GET METHOD FOR BLOGS
app.get("/blogs", (req, res) => {
  res.send("<p>Response received from Blogs page</p>.");
});

// GET METHOD FOR PROJECTS
app.get("/projects", (req, res) => {
  res.status(200).json({
    cookies: req.cookies,
  });
});

// GET METHOD FOR ABOUT
app.get("/about", (req, res) => {});

// POST (SAVE)
// POST METHOD FOR CONTACT
app.post("/contact/:id", (req, res) => {
  res.status(200).format({
    json: () => {
      res.send({
        ip: req.ip,
        query: req.query,
        body: req.body,
        path: req.path,
        params: req.params,
      });
    },
  });
});

// POST METHOD FOR BLOGS
app.post("/blogs/:id", (req, res) => {
  res.send("<p>Post created for or from Blogs page</p>.");
});

// POST METHOD FOR PROJECTS
app.post("/projects/:id", (req, res) => {
  res.send("<p>Post created for or from Projects page</p>.");
});

// POST METHOD FOR LOGIN
app.post("/login", (req, res) => {
  res.cookie("token", "askdjbajfdlajsda");
  res.cookie("username", "troll1234");
  res.cookie("location", "Jakarta");

  res.status(200).json({
    message: "Logged in",
  });
});

// PUT (EDIT)
// PUT METHOD FOR CONTACT
app.put("/contacts", (req, res) => {
  res.send("<p>Put from Contacts page</p>.");
});

// PUT METHOD FOR BLOGS
app.put("/blogs", (req, res) => {
  res.send("<p>Put from Blogs page</p>.");
});

// PUT METHOD FOR PROJECTS
app.put("/projects", (req, res) => {
  res.send("<p>Put from Projects page</p>.");
});

// PATCH
// PATCH METHOD FOR CONTACTS
app.patch("/contacts", (req, res) => {
  res.send("<p>Patch from Contacts page</p>.");
});

// PATCH METHOD FOR BLOGS
app.patch("/blogs", (req, res) => {
  res.send("<p>Patch from Blogs page</p>.");
});

// PATCH METHOD FOR PROJECTS
app.patch("/projects", (req, res) => {
  res.send("<p>Patch from Projects page</p>.");
});

// DELETE
// DELETE METHOD FOR LOGOUT
app.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.clearCookie("location");

  res.status(200).json({
    message: "Cookies cleared",
  });
});

// DELETE METHOD FOR CONTACTS
app.delete("/contacts", (req, res) => {
  res.send("<p>Delete from Contacts page</p>.");
});

// DELETE METHOD FOR BLOGS
app.delete("/blogs", (req, res) => {
  res.send("<p>Delete from Blogs page</p>.");
});

// DELETE METHOD FOR PROJECTS
app.delete("/projects", (req, res) => {
  res.send("<p>Delete from Projects page</p>.");
});

// ERROR MIDDLEWARE
app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

app.listen(5000, () => {
  console.info(`App is running in localhost:5000`);
});
