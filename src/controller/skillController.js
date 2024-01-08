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

// GET SKILL BY ID
const get = async (req, res, next) => {
  try {
    let id = req.params.id;
    id = Validate(isID, id);
    let skill = await Prisma.skill.findUnique({
      where: { id },
      include: {category:true}
    });
    if (!skill) throw new ResponseError(404, `NO SKILL DATA: ${id}`);
    res.status(200).json({
      message: "SUCCESS GET DATA SKILL",
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

// POST METHOD SKILL
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
const put = async (req, res, next) => {
  try {
    let skill = req.body
    let id = req.params.id
    skill = Validate(isSkill, skill)
    id = Validate(isID, id)

    const currentSkill = await Prisma.skill.findUnique({
      where: {id},
      select:{id:true}
    })
    if(!currentSkill) throw new ResponseError(404, `SKILL WITH ID ${id} IS NOT FOUND`)

    const categoryId = await skillService.find_or_create_skill_category(skill.category)

    const update_skill = {
      title: skill.title,
      skillCategoryId: categoryId
    }
    
    const updatedSkill = await Prisma.skill.update({
      where:{id},
      data: update_skill
    })

    res.status(200).json({
      message: "SUCCESS UPDATE SKILL",
      data: updatedSkill
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
