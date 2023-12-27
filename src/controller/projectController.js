const projectsMessage = { message: "OK from Projects Page", status: 200 };

// GET METHOD PROJECTS
const get = (req, res) => {
  res.status(200).json(projectsMessage);
};

// POST METHOD  PROJECTS
const post = (req, res) => {
  res.status(200).json(projectsMessage);
};

// PUT METHOD PROJECTS
const put = (req, res) => {
  res.status(200).json(projectsMessage);
};

// PATCH METHOD PROJECTS
const patch = (req, res) => {
  res.status(200).json(projectsMessage);
};

// DELETE METHOD PROJECTS
const remove = (req, res) => {
  res.status(200).json(projectsMessage);
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
