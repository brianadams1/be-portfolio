const profileMessage = { message: "OK from Profile Page", status: 200 };

// GET METHOD PROFILE
const get = (req, res) => {
  const data = {
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@gmail.com",
    age: 18,
  };
  res.status(200).json(data);
};

// POST METHOD  PROFILE
const post = (req, res) => {
  res.status(200).json(profileMessage);
};

// PUT METHOD PROFILE
const put = (req, res) => {
  res.status(200).json(profileMessage);
};

// PATCH METHOD PROFILE
const patch = (req, res) => {
  res.status(200).json(profileMessage);
};

// DELETE METHOD PROFILE
const remove = (req, res) => {
  res.status(200).json(profileMessage);
};

export default { get, post, put, patch, remove };
