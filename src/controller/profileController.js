import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isProfile } from "../validation/profileValidation.js";
import fileService from "../service/fileService.js";
import projectController from "./projectController.js";
import blogController from "./blogController.js";
import educationController from "./educationController.js";
import skillController from "./skillController.js";
import experienceController from "./experienceController.js";
import dayjs from "dayjs";

// GET METHOD PROFILE
const get = async (req, res, next) => {
  try {
    // CHECK TO DATABASE
    const profile = await getProfile();

    // IF DATA IS EXIST, SEND DATA
    res.status(200).json(profile);
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
      const old_avatar = dataProfile.avatar;
      const new_avatar = profile.avatar;
      if (new_avatar) {
        if (new_avatar != old_avatar)
          await fileService.removeFile("." + new_avatar);
      }
    }

    res.status(200).json(dataProfile);
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
    const experience = await experienceController.getExperiences();

    // TAKE EDUCATION DATA
    const educations = await educationController.getEducations();

    // TAKE SKILL DATA BY CATEGORY
    const skills = await skillController.handleSkillByCategory();
    // TAKE BLOG DATA
    const { blogs } = await blogController.getByPage(1, 4);

    // CALCULATE PROJECT AMOUNT
    profile.project_count = projects.length;

    // CALCULATE EXPERIENCE YEAR > FIRST PROJECT STARTYEAR COMPARE TO NOW
    const firstProject = projects.findLast((p) => true);
    const firstProjectDate = dayjs(firstProject.startDate);
    profile.year_of_exp = dayjs().diff(firstProjectDate, "year");
    profile.month_of_exp = dayjs().diff(firstProjectDate, "month");

    res.status(200).json({
      profile,
      projects,
      experience,
      skills,
      educations,
      blogs,
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
