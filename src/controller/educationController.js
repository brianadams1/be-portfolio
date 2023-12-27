const educationsMessage = { message: "OK from Educations Page", status: 200 };

const get =  (req, res) => {
    res.status(200).json(educationsMessage);
  }
const post =  (req, res) => {
    res.status(200).json(educationsMessage);
  }
const put =  (req, res) => {
    res.status(200).json(educationsMessage);
  }
const patch =  (req, res) => {
    res.status(200).json(educationsMessage);
  }
const remove =  (req, res) => {
    res.status(200).json(educationsMessage);
  }

export default {
    get, post, put, patch, remove
}