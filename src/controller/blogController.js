const blogsMessage = { message: "OK from Blogs Page", status: 200 };

const get = (req, res) => {
  res.status(200).json(blogsMessage);
};
const post = (req, res) => {
  res.status(200).json(blogsMessage);
};

const put = (req, res) => {
  res.status(200).json(blogsMessage);
};
const patch = (req, res) => {
  res.status(200).json(blogsMessage);
};
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
