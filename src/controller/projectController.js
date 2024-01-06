const projectsMessage = { message: "OK from Projects Page", status: 200 };

// GET ALL METHOD
const getAll = (req, res, next) => {
  try {
    
    res.status(200).json(projectsMessage);
  } catch (error) {
    next(error)
  }
};


// GET METHOD PROJECTS
const get = (req, res) => {
  try {
    
    res.status(200).json(projectsMessage);
  } catch (error) {
    next(error)
  }
};

// POST METHOD  PROJECTS
const post = (req, res) => {
  try {
    
  } catch (error) {
    next(error)
  }
  res.status(200).json(projectsMessage);
};

// PUT METHOD PROJECTS
const put = (req, res) => {
  res.status(200).json(projectsMessage);
};


// DELETE METHOD PROJECTS
const remove = (req, res) => {
  res.status(200).json(projectsMessage);
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
};
