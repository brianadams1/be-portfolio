import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isID } from "../validation/mainValidation.js";
import { ResponseError } from "../error/responseError.js";
import { isProject } from "../validation/projectValidation.js";
import dayjs from "dayjs";

const formatData = (p) => {
  const date = p.startDate;

  p.readDateTime = dayjs(date).format("D MMM YYYY");
  p.shortenDateTime = dayjs(date).format("D MMM YYYY");

  if (p.endDate) {
    const endDate = p.endDate;
    p.readEndDateTime = dayjs(endDate).format("D MMM YYYY");
    p.shortenEndDateTime = dayjs(endDate).format("D MMM YYYY");
  } else {
    p.readEndDateTime = "Present";
  }
};

// GET ALL METHOD
const getAll = async (req, res, next) => {
  try {
    // PAGINATION
    // PAGE
    const page = Number(req.query.page) || 1;

    // LIMIT
    const limit = Number(req.query.limit) || 10;

    const { projects, total } = await getByPage(page, limit);
    // GET MAX PAGE
    const maxPage = Math.ceil(total / limit);

    res.status(200).json({
      message: "SUCCESS GET ALL PROJECTS DATA",
      data: projects,
      page,
      total,
      limit,
      maxPage,
    });
  } catch (error) {
    next(error);
  }
};

// PAGINATION METHOD
const getByPage = async (page, limit = 10) => {
  // CALCULATE SKIP
  const skip = (page - 1) * limit;

  // FIND ALL PROJECTS
  let projects = await Prisma.project.findMany({
    take: limit,
    skip,
  });

  for (const p of projects) {
    formatData(p);
  }

  // GET TOTAL DATA
  const total = await Prisma.project.count();

  return { projects, total };
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

    formatData(project);

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

    formatData(project);

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

    formatData(project);

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
  getByPage,
};
