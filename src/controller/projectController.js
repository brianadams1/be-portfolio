import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isID } from "../validation/mainValidation.js";
import { ResponseError } from "../error/responseError.js";
import { isProject } from "../validation/projectValidation.js";

// GET ALL METHOD
const getAll = async (req, res, next) => {
  try {
    // FIND ALL PROJECTS
    let projects = await Prisma.project.findMany();

    res.status(200).json({
      message: "SUCCESS GET ALL PROJECTS DATA",
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// GET METHOD PROJECTS
const get = async (req, res, next) => {
  try {
    // CHECK ID AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // FIND PROJECT BY ID
    let project = await Prisma.project.findUnique({ where: { id } });

    // IF WANTED PROJECT IS NOT FOUND, THROW ERROR
    if (!project) throw new ResponseError(404, `PROJECT ${id} IS NOT FOUND`);

    res.status(200).json({
      message: "SUCCESS GET PROJECT DATA BY ID" + id,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// POST METHOD  PROJECTS
const post = async (req, res, next) => {
  try {
    // GET PROJECT INPUT DATA
    let project = req.body;

    // VALIDATE
    project = Validate(isProject, project);

    // POST THE DATAS
    let newProject = await Prisma.project.create({ data: project });

    // IF SUCCESS
    res.status(200).json({
      message: "SUCCESS POST NEW PROJECT",
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD PROJECTS
const put = async (req, res, next) => {
  try {
    // GET ID AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // GET PROJECT FROM INPUT AND VALIDATE
    let project = req.body;
    project = Validate(isProject, project);

    // SEARCH WANTED PROJECT
    let currentProject = await Prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    // IF PROJECT IS UNAVAILABLE
    if (!currentProject)
      throw new ResponseError(404, `PROJECT ${id} IS NOT FOUND`);

    // UPDATE THE PROJECT
    const update = await Prisma.project.update({
      where: { id },
      data: project,
    });

    res.status(200).json({
      message: "SUCCESS UPDATE PROJECT DATA BY ID",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD PROJECTS
const remove = async (req, res, next) => {
  try {
    // GET ID FROM REQUEST AND VALIDATE
    let id = req.params.id;
    id = Validate(isID, id);

    // CHECK IF CERTAIN PROJECT IS EXIST
    let project = await Prisma.project.findUnique({
      where: { id },
      select: { id: true },
    });

    // IF THE PROJECT IS NOT FOUND
    if (!project) throw new ResponseError(404, `Project ${id} is not found`);

    // IF FOUND, DELETE EXECUTION
    const deleteProject = await Prisma.blog.delete({ where: { id } });

    res.status(200).json({
      message: "SUCCESS DELETE PROJECT DATA BY ID =" + id,
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
