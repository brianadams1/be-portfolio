const skillsMessage = { message: "OK from Skills Page", status: 200 };

// GET METHOD SKILLS
const get = (req, res) => {
  res.status(200).json(skillsMessage);
};

// POST METHOD SKILLS
const post = (req, res) => {
  res.status(200).json(skillsMessage);
};

// PUT METHOD SKILLS
const put = (req, res) => {
  res.status(200).json(skillsMessage);
};

// PATCH METHOD SKILLS
const patch = (req, res) => {
  res.status(200).json(skillsMessage);
};

// DELETE METHOD SKILLS
const remove = (req, res) => {
  res.status(200).json(skillsMessage);
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
