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

// PUT METHOD PROFILE
const put = (req, res) => {
  res.status(200).json(profileMessage);
};


export default { get, put};
