import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isEducation } from "../validation/educationValidation.js";
import { isID } from "../validation/mainValidation.js";

// GET METHOD EDUCATIONS
const getAll = async (req, res, next) => {
  try {
    const data = await getEducations();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getEducations = async () => {
  return await Prisma.education.findMany({
    orderBy: { startYear: "desc" },
  });
};

// GET METHOD EDUCATION BY ID
const get = async (req, res, next) => {
  try {
    let id = req.params.id;
    id = Validate(isID, id);

    const education = await Prisma.education.findUnique({ where: { id } });

    if (education == null)
      throw new ResponseError(404, `NO DATA EDUCATION : ${id}`);

    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
};

// POST METHOD EDUCATIONS
const post = async (req, res, next) => {
  try {
    let education = req.body;
    education = Validate(isEducation, education);

    await Prisma.education.create({ data: education });

    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
};

// PUT METHOD EDUCATIONS
const put = async (req, res, next) => {
  try {
    let education = req.body;
    let id = req.params.id;
    education = Validate(isEducation, education);
    id = Validate(isID, id);

    const currentEducation = await Prisma.education.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentEducation)
      throw new ResponseError(404, `EDUCATION WITH ID ${id} IS NOT FOUND`);

    const update = await Prisma.education.update({
      where: { id },
      data: education,
    });

    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD EDUCATIONS
const remove = async (req, res, next) => {
  try {
    let id = req.params.id;

    // JOI VALIDATE ID
    id = Validate(isID, id);

    // check if CERTAIN blog is available
    const certainEducation = await Prisma.education.findUnique({
      where: { id },
      select: { id: true },
    });

    // 404 BLOG NOT FOUND
    if (!certainEducation)
      throw new ResponseError(404, `Education with ID ${id} is not found`);

    // DELETE EXECUTION
    await Prisma.education.delete({ where: { id } });

    res.status(200).json({
      message: `DELETE DATA WITH ID ${id} IS SUCCESSFUL`,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getEducations,
  get,
  post,
  put,
  remove,
};
