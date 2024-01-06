import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isID } from "../validation/mainValidation.js";
import { ResponseError } from "../error/responseError.js";

// GET ALL METHOD
const getAll = async (req, res, next) => {
  try {
    let project = await Prisma.project.findMany();

    res.status(200).json({
      message: "SUCCESS GET ALL PROJECTS DATA",
    });
  } catch (error) {
    next(error);
  }
};

// GET METHOD PROJECTS
const get = async (req, res, next) => {
  try {
    let id = req.params.id;
    id = Validate(isID, id);

    let project = await Prisma.project.findUnique({
      where: { id },
    });

    if(!project) throw new ResponseError(404,`PROJECT ${id} IS NOT FOUND`)

    res.status(200).json({
      message: "SUCCESS GET PROJECT DATA BY ID",
    });
  } catch (error) {
    next(error);
  }
};

// POST METHOD  PROJECTS
const post = async (req, res, next) => {
  try {
    // GET PROJECT INPUT DATA
    let datas = req.body;
    res.status(200).json({
      message: "SUCCESS POST NEW PROJECT",
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD PROJECTS
const put = async (req, res, next) => {
  try {
    let datas = req.body;
    res.status(200).json({
      message: "SUCCESS UPDATE PROJECT DATA BY ID",
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD PROJECTS
const remove = async (req, res, next) => {
  try {
    let project = await Prisma.project.findUnique();

    res.status(200).json({
      message: "SUCCESS DELETE PROJECT DATA BY ID",
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
