import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import skillService from "../service/skillService.js";
import { isID } from "../validation/mainValidation.js";
import { isSkill } from "../validation/skillValidation.js";

// GET METHOD SKILLS
const getAll = async (req, res) => {
  const data = await Prisma.skill.findMany({ include: { category: true } });
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
      include: { category: true },
    });
    if (!skill) throw new ResponseError(404, `NO SKILL DATA: ${id}`);
    res.status(200).json({
      message: "SUCCESS GET DATA SKILL",
      data: skill,
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
    // GET DATA FROM INPUT AND VALIDATE
    let skill = req.body;
    let id = req.params.id;
    skill = Validate(isSkill, skill);
    id = Validate(isID, id);

    // SEARCH THE CERTAIN SKILL USING ID
    const currentSkill = await Prisma.skill.findUnique({
      where: { id },
      select: { id: true, skillCategoryId: true },
    });

    // IF ERROR, THROW 404
    if (!currentSkill)
      throw new ResponseError(404, `SKILL WITH ID ${id} IS NOT FOUND`);

    // FIND THE CATEGORY ID FROM SERVICE
    const categoryId = await skillService.find_or_create_skill_category(
      skill.category
    );

    // OBJECTING
    const update_skill = {
      title: skill.title,
      skillCategoryId: categoryId,
    };

    // UPDATE EXECUTION
    const updatedSkill = await Prisma.skill.update({
      where: { id },
      data: update_skill,
    });

    // REMOVE CATEGORY IF EMPTY USING PREVIOUS ID FROM DB
    const previousSkillId = currentSkill.skillCategoryId;
    await skillService.remove_category(previousSkillId);

    res.status(200).json({
      message: "SUCCESS UPDATE SKILL",
      data: updatedSkill,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD SKILLS
const remove = async (req, res, next) => {
  try {
    // GET DATA BY ID AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // CHECK CERTAIN SKILL
    const certainSkill = await Prisma.skill.findUnique({
      where: { id },
      select: {
        id: true,
        skillCategoryId: true,
      },
    });

    // IF CERTAIN SKILL IS NOT EXIST
    if (!certainSkill)
      throw new ResponseError(404, `SKILL WITH ID ${id} IS NOT FOUOND`);

    // IF EXIST, DELETE EXECUTION
    const deleteSkill = await Prisma.skill.delete({
      where: { id },
    });

    // REMOVE CATEGORY IF EMPTY USING PREVIOUS ID FROM DB
    const previousSkillId = certainSkill.skillCategoryId;
    await skillService.remove_category(previousSkillId);

    res.status(200).json({
      message: "DELETE DATA SUCCESS WITH ID = " + id,
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
