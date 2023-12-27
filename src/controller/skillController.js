const skillsMessage = { message: "OK from Skills Page", status: 200 };

const get =  (req, res) => {
    res.status(200).json(skillsMessage);
  }

  const post =  (req, res) => {
    res.status(200).json(skillsMessage);
  }
  
  const put =  (req, res) => {
    res.status(200).json(skillsMessage);
  }

  const patch =  (req, res) => {
    res.status(200).json(skillsMessage);
  }

  const remove =  (req, res) => {
    res.status(200).json(skillsMessage);
  }

export default {
    get,
post,
put,
patch,
remove
}