const educationsMessage = { message: "OK from Educations Page", status: 200 };

// GET METHOD EDUCATIONS
const get =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

// POST METHOD EDUCATIONS
const post =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

// PUT METHOD EDUCATIONS
const put =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

// PATCH METHOD EDUCATIONS
const patch =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

// DELETE METHOD EDUCATIONS
const remove =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

export default {
    get, post, put, patch, remove
}