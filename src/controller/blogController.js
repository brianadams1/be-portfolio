import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import Joi from "joi";
import { isID } from "../validation/mainValidation.js";

const blogsMessage = { message: "OK from Blogs Page", status: 200 };
// GETALL METHOD BLOGS
const getAll = async (req, res, next) => {
  try {
    // FIND MANY >> ambil semua blog
    const datas = await Prisma.blog.findMany();
    res.status(200).json({
      message: "SUCCESS GET ALL DATA BLOG",
      data: datas,
    });
  } catch (error) {
    next(error);
  }
};
// GET METHOD BLOG BY ID
const get = async (req, res, next) => {
  // IF SERVER IS OK
  try {
    let id = req.params.id;

    //  VALIDATE ID
    id = Validate(isID, id);

    // START: CHECK BLOG EXISTENCE
    const blog = await Prisma.blog.findUnique({
      where: { id },
    });
    // HANDLE NOT FOUND
    if (blog == null) {
      return res.status(404).json({
        message: `NO DATA BLOG ${id}`,
      });
    }
    // HANDLE FOUND
    res.status(200).json({
      message: `SUCCESS GET BLOG DATA BY ID : ${id}`,
      data: blog,
    });
    // END: CHECK BLOG EXISTENCE
  } catch (error) {
    // IF SERVER IS DOWN
    next(error);
  }
};

// POST METHOD BLOGS
const post = async (req, res, next) => {
  try {
    let blog = req.body;

    // START : JOI VALIDATE BLOG
    // USING OBJECT VALIDATION

    const schemaBlog = Joi.object({
      title: Joi.string().trim().max(255).required().label("Title"),
      content: Joi.string().min(3).required().label("Content"),
    });
    blog = Validate(schemaBlog, blog);

    // END : JOI VALIDATE BLOG

    const newBlog = await Prisma.blog.create({
      data: blog,
    });
    res.status(200).json({
      message: "BERHASIL MENYIMPAN DATA BLOG BARU",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD BLOGS
const put = async (req, res, next) => {
  try {
    let blog = req.body;
    let id = req.params.id;

    //  VALIDATE ID
    id = Validate(isID, id);

    // START : JOI VALIDATE BLOG
    // USING OBJECT VALIDATION

    const schemaBlog = Joi.object({
      title: Joi.string().positive().trim().max(255).required().label("Title"),
      content: Joi.string().min(3).required().label("Content"),
    });
    blog= Validate(schemaBlog, blog)
    
    // END : JOI VALIDATE BLOG

    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog) {
      // 404 BLOG NOT FOUND
      return res.status(404).json({
        message: `Blog with ID ${id} is not found`,
      });
    }
    const update = await Prisma.blog.update({
      where: { id },
      data: blog,
    });

    res.status(200).json({
      message: "BERHASIL UPDATE KESELURUHAN DATA BLOG",
    });
  } catch (error) {
    next(error);
  }
};

// PATCH METHOD BLOGS
const updateTitle = async (req, res, next) => {
  try {
    let title = req.body.title;
    let id = req.params.id;

    // JOI VALIDATE ID
    id = Validate(isID,id)

    // START : JOI VALIDATE BLOG
    // USING OBJECT VALIDATION

    const schemaTitle = Joi.string().trim().max(255).required().label("Title");

    title = Validate(schemaTitle, title)
    // END : JOI VALIDATE BLOG

    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog) {
      // 404 BLOG NOT FOUND
      return res.status(404).json({
        message: `Blog with ID ${id} is not found`,
      });
    }

    // UPDATE TITLE EXECUTION
    const updateTitle = await Prisma.blog.update({
      where: { id },
      data: { title },
    });
    res.status(200).json({
      message: `UPDATE TITLE BLOG ID ${id} SUCCESSFUL`,
      data: updateTitle,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE METHOD BLOGS
const remove = async (req, res, next) => {
  try {
    // const blog = req.body;
    let id = req.params.id;

    // JOI VALIDATE ID
    id = Validate(isID, id);


    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog) {
      // 404 BLOG NOT FOUND
      return res.status(404).json({
        message: `Blog with ID ${id} is not found`,
      });
    }

    // DELETE EXECUTION
    const deleteBlog = await Prisma.blog.delete({
      where: { id },
    });
    res.status(200).json({
      message: `DELETE DATA WITH ID ${id} IS SUCCESSFUL`,
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
  updateTitle,
  remove,
};
