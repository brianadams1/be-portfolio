import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import skillService from "../service/skillService.js";
import { isID } from "../validation/mainValidation.js";
import { isSkill } from "../validation/skillValidation.js";

// GET METHOD SKILLS
const getAll = async (req, res) => {
  const data = await Prisma.skill.findMany({
    include: {
      category: true,
    },
  });
  res.status(200).json({
    message: "SUCCESS GET ALL SKILL DATAS",
    data: data,
  });
};

const get = async (req, res, next) => {
  try {
    let id = req.params.id;
    id = Validate(isID, id);
    let skill = await Prisma.skill.findUnique({
      where: { id },
    });
    if (!skill) throw new ResponseError(404, `NO SKILL DATA: ${id}`);
    res.status(200).json({
      message: "",
    });
  } catch (error) {
    next(error);
  }
};

// POST METHOD SKILLS
const post = async (req, res, next) => {
  try {
    // TAKE DATA FROM INPUT AND VALIDATE
    let skill = req.body;
    skill = Validate(isSkill, skill);

    // TAKE CATEGORY ID => FIND OR CREATE
    const id_category = await skillService.find_or_create_skill_category(
      skill.category
    );

    // CREATE NEW SKILL
    const insertSkill = {
      title: skill.title,
      skillCategoryId: id_category,
    };

    const dataSkill = await Prisma.skill.create({ data: insertSkill });

    res.status(200).json({
      message: "SUCCESS CREATE NEW SKILL",
      data: dataSkill,
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD SKILLS
const put = (req, res, next) => {
  try {
    res.status(200).json({
      message: "",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD SKILLS
const remove = (req, res, next) => {
  try {
    res.status(200).json({
      message: "",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  get,
  post,
  put,
  remove,
};
