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
        
    } catch (error) {
        next(error)
    }
}

export default {};
