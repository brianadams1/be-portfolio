import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isProfile } from "../validation/profileValidation.js";
import fileService from "../service/fileService.js";
import projectController from "./projectController.js";
import blogController from "./blogController.js";
import educationController from "./educationController.js";
import skillController from "./skillController.js";

// GET METHOD PROFILE
const get = async (req, res, next) => {
  try {
    // CHECK TO DATABASE
    const profile = await getProfile();

    // IF DATA IS EXIST, SEND DATA
    res.status(200).json({
      message: "SUCCESS GET PROFILE DATA",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD PROFILE
const put = async (req, res, next) => {
  try {
    // CHECK TO DATABASE
    let profile = await Prisma.profile.findFirst();

    // GET INPUTTED DATA
    let datas = req.body;

    // ADD AVATAR
    if (req.file) {
      const avatar = "/" + req.file.path.replaceAll("\\", "/");
      datas.avatar = avatar;
    }

    // VALIDATE THE DATAS
    datas = Validate(isProfile, datas);

    let dataProfile = {};

    // IF DATA IS EMPTY, CREATE NEW DATA FROM INPUT
    if (!profile) {
      dataProfile = await Prisma.profile.create({ data: datas });
    } else {
      // IF EXIST, UPDATE
      dataProfile = await Prisma.profile.update({
        where: { email: profile.email },
        data: datas,
      });

      // DELETE PREVIOUS AVATAR PIC
      if (profile.avatar) await fileService.removeFile("." + profile.avatar);
    }

    res.status(200).json({
      message: "DATAS HAS BEEN UPDATED",
      data: dataProfile,
    });
  } catch (error) {
    // IF ERROR AND FILE IS EXIST, DELETE FILE
    if (req.file) fileService.removeFile(req.file.path);

    next(error);
  }
};

// TAKE ALL USER DATA
const portfolio = async (req, res, next) => {
  try {
    // TAKE PROFILE DATA
    const profile = await getProfile();

    // TAKE PROJECT DATA
    const { projects } = await projectController.getByPage(1, 4);

    // TAKE EXPERIENCE DATA
    // TAKE EDUCATION DATA
    const educations = await educationController.getEducations();

    // TAKE SKILL DATA BY CATEGORY
    const skills = await skillController.handleSkillByCategory();
    // TAKE BLOG DATA
    const { blogs } = await blogController.getByPage();

    res.status(200).json({
      message: "SUCCESS GET PORTFOLIO DATA",
      data: {
        profile,
        projects: projects,
        educations: educations,
        blogs: blogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async () => {
  let profile = await Prisma.profile.findFirst();

  // IF DATA IS EMPTY, SEND DUMMY DATA
  if (!profile) {
    profile = {
      email: "example@email.com",
      firstName: "-",
      lastName: "-",
      dob: "1900-01-01",
      address: "-",
      city: "-",
      country: "-",
      job: "-",
    };
  }
  return profile;
};

export default { get, put, portfolio };
