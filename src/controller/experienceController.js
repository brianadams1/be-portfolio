import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isExperience } from "../validation/experienceValidation.js";
import { isID } from "../validation/mainValidation.js";

// GET ALL METHOD
const getAll = async (req, res, next) => {
  try {
    let experiences = await Prisma.experience.findMany();

    res.status(200).json({
      message: "SUCCESS GET ALL EXPERIENCE DATA",
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    // CHECK ID AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // FIND EXPERIENCE BY ID
    let experience = await Prisma.experience.findUnique({ where: { id } });

    // IF WANTED EXPERIENCE IS NOT FOUND, THROW ERROR
    if (!experience)
      throw new ResponseError(404, `EXPERIENCE ${id} IS NOT FOUND`);

    res.status(200).json({
      message: "SUCCESS GET EXPERIENCE DATA BY ID " + id,
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    // GET EXPERIENCE INPUT DATA AND VALIDATE
    let experience = req.body;
    experience = Validate(isExperience, experience);

    // POST THE DATA
    let newExperience = await Prisma.experience.create({ data: experience });

    // IF SUCCESS
    res.status(200).json({
      message: "SUCCESS POST NEW EXPERIENCE",
      data: newExperience,
    });
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    // GET ID AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // GET EXPERIENCE FROM INPUT AND VALIDATE
    let experience = req.body;
    experience = Validate(isExperience, experience);

    // SEARCH WANTED EXPERIENCE
    let certainExperience = await Prisma.experience.findUnique({
      where: { id },
      select: { id: true },
    });

    //IF WANTED EXPERIENCE IS UNAVAILABLE
    if (!certainExperience)
      throw new ResponseError(404, `EXPERIENCE ${id} IS NOT FOUND`);

    // UPDATE THE EXPERIENCE
    const update = await Prisma.experience.update({
      where: { id },
      data: experience,
    });

    res.status(200).json({
      message: "SUCCESS UPDATE EXPERIENCE DATA BY ID",
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    // GET ID FROM REQUEST AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // CHECK IF CERTAIN PROJECT IS EXIST
    let experience = await Prisma.experience.findUnique({
      where: { id },
      select: { id: true },
    });

    // IF THE EXPERIENCE IS NOT FOUND
    if (!experience)
      throw new ResponseError(404, `EXPERIENCE ${id} IS NOT FOUND`);

    // IF FOUND, EXECUTE THE DELETE
    const deleteExperience = await Prisma.experience.delete({ where: { id } });

    res.status(200).json({
      message: "SUCCESS DELETE EXPERIENCE DATA BY ID " + id,
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