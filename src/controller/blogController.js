const blogsMessage = { message: "OK from Blogs Page", status: 200 };

// GET METHOD BLOGS
const get = (req, res) => {
  res.status(200).json(blogsMessage);
};

// POST METHOD BLOGS
const post = (req, res) => {
  res.status(200).json(blogsMessage);
};

// PUT METHOD BLOGS
const put = (req, res) => {
  res.status(200).json(blogsMessage);
};

// PATCH METHOD BLOGS
const patch = (req, res) => {
  res.status(200).json(blogsMessage);
};

// DELETE METHOD BLOGS
const remove = (req, res) => {
  res.status(200).json(blogsMessage);
};

export default {
  get,
  post,
  put,
  patch,
  remove,
};
