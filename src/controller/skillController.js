import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isID } from "../validation/mainValidation.js";
import { isSkill } from "../validation/skillValidation.js";

// GET METHOD SKILLS
const getAll = async (req, res) => {
  const data = await Prisma.skill.findMany();
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
    const id_category = await find_or_create_skill_category(skill.category)

// CREATE NEW SKILL
    const insertSkill = {
      title: skill.title,
      skillCategoryId: id_category
    }

    const dataSkill = await Prisma.skill.create({data: insertSkill})

    res.status(200).json({
      message: "SUCCESS CREATE NEW SKILL",
      data: dataSkill
    });
  } catch (error) {
    next(error);
  }
};

// FIND / CREATE SKILL CATEGORY ID
const find_or_create_skill_category = async(title)=>{
  // FIND CATEGORY
  const category = await Prisma.skillCategory.findFirst({
    where: {title : title}
  })

  // IF EXIST, RETURN ITS ID
  if(category) return category.id

  // IF NOT, CREATE NEW
  const newCategory = await Prisma.skillCategory.create({
    data:{ title}
  })
  // RETURN THE ID
  return newCategory.id
}

// PUT METHOD SKILLS
const put = (req, res) => {
  res.status(200).json({
    message: "",
  });
};

// PATCH METHOD SKILLS
const patch = (req, res) => {
  res.status(200).json({
    message: "",
  });
};

// DELETE METHOD SKILLS
const remove = (req, res) => {
  res.status(200).json({
    message: "",
  });
};

export default {
  getAll,
  get,
  post,
  put,
  patch,
  remove,
};
