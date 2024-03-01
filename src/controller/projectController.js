import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isID } from "../validation/mainValidation.js";
import { ResponseError } from "../error/responseError.js";
import { isProject } from "../validation/projectValidation.js";
import dayjs from "dayjs";
import fileService from "../service/fileService.js";

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

  const skills = p.skills.map((ps) => ps.Skill);
  p.skills = skills;
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
      projects,
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
    orderBy: { startDate: "desc" },
    include: { photos: true, skills: { include: { Skill: true } } },
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
    let project = await Prisma.project.findUnique({
      where: { id },
      include: { photos: true, skills: { include: { Skill: true } } },
    });

    // IF WANTED PROJECT IS NOT FOUND, THROW ERROR
    if (!project) throw new ResponseError(404, `PROJECT ${id} IS NOT FOUND`);

    formatData(project);

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

// POST METHOD  PROJECTS
const post = async (req, res, next) => {
  try {
    // GET PROJECT INPUT DATA
    const photos = fileService.getUploadedPhotos(req);
    let project = req.body;

    // VALIDATE
    project = Validate(isProject, project);

    // [{skillId: 5, skillId:6}]
    const skills = project.skills.map((s) => {
      return { skillId: s };
    });

    // POST THE DATAS
    let newProject = await Prisma.project.create({
      data: {
        ...project,
        photos: { create: photos },
        skills: { createMany: { data: skills } },
      },
      include: { photos: true, skills: { include: { Skill: true } } },
    });

    formatData(newProject);

    // IF SUCCESS
    res.status(200).json({
      message: "SUCCESS POST NEW PROJECT",
      data: newProject,
    });
  } catch (error) {
    if (req.files) {
      // DELETE FILE IF ERROR OCCURED
      for (const f of req.files) {
        await fileService.removeFile(f.path);
      }
    }
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
      include: { photos: true },
    });

    // IF PROJECT IS UNAVAILABLE
    if (!currentProject)
      throw new ResponseError(404, `PROJECT ${id} IS NOT FOUND`);

    // GET EXISTING PHOTO IDs
    const currentPhotos = currentProject.photos.map((p) => p.id);
    const keptPhotos = project.photos || []; // EMPTY ARRAY DEFAULT IF THIS IS NOT MOUNTED

    // FILTERING KEPT PHOTOS
    const keepPhotos = currentPhotos.filter((p) => keptPhotos.includes(p));
    const photos_to_be_removed = currentProject.photos.filter((i) =>
      keptPhotos.includes(i)
    );

    // hapus property photos dari blog
    delete project.photos;

    //  simpan foto baru
    const newPhotos = fileService.getUploadedPhotos(req);
    let skills = [];
    if (project.skills) {
      skills = project.skills.map((s) => {
        return { skillId: s };
      });
    }

    delete project.skills;

    // UPDATE THE PROJECT
    const update = await Prisma.project.update({
      where: { id },
      data: {
        ...project,
        photos: {
          deleteMany: {
            id: {
              notIn: keepPhotos,
            },
          },
          create: newPhotos,
        },
        skills: {
          deleteMany: {},
          createMany: { data: skills },
        },
      },
      include: { photos: true, skills: { include: { Skill: true } } },
    });

    for (const p of photos_to_be_removed) {
      await fileService.removeFile(p.path);
    }

    formatData(update);

    res.status(200).json({
      message: "SUCCESS UPDATE PROJECT DATA BY ID",
      data: update,
    });
  } catch (error) {
    if (req.files) {
      // DELETE FILE IF ERROR OCCURED
      for (const f of req.files) {
        await fileService.removeFile(f.path);
      }
    }
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
      include: { photos: true },
    });

    // IF THE PROJECT IS NOT FOUND
    if (!project) throw new ResponseError(404, `Project ${id} is not found`);

    for (const p of project.photos) {
      await fileService.removeFile(p.path);
    }
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
