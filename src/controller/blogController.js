import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isID } from "../validation/mainValidation.js";
import { isBlog, isBlogTitle } from "../validation/blogValidation.js";
import { ResponseError } from "../error/responseError.js";

// GETALL METHOD BLOGS
const getAll = async (req, res, next) => {
  try {
    // PAGINATION
    // PAGE
    const page = Number(req.query.page) || 1;

    // LIMIT
    const limit = Number(req.query.limit) || 10;

    const { blogs, total } = await getByPage(page, limit);

    // GET MAX PAGE
    const maxPage = Math.ceil(total / limit);

    res.status(200).json({
      message: "SUCCESS GET ALL DATA BLOG",
      data: blogs,
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
const getByPage = async (page = 1, limit = 10) => {
  // CALCULATE SKIP
  const skip = (page - 1) * limit;

  // FIND ALL BLOGS
  let blogs = await Prisma.blog.findMany({
    take: limit,
    skip,
  });

  // GET TOTAL DATA
  const total = await Prisma.blog.count();

  return { blogs, total };
};

// GET METHOD BLOG BY ID
const get = async (req, res, next) => {
  // IF SERVER IS OK
  try {
    let id = req.params.id;

    //  VALIDATE ID
    id = Validate(isID, id);

    // START: CHECK BLOG EXISTENCE
    const blog = await Prisma.blog.findUnique({ where: { id } });
    // HANDLE NOT FOUND
    if (blog == null) throw new ResponseError(404, `NO DATA BLOG ${id}`);

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
    // JOI VALIDATE BLOG
    blog = Validate(isBlog, blog);

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

    // JOI VALIDATE BLOG
    blog = Validate(isBlog, blog);

    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog)
      throw new ResponseError(404, `Blog with ID ${id} is not found`);

    const update = await Prisma.blog.update({
      where: { id },
      data: blog,
    });

    res.status(200).json({
      message: "SUCCESS REPLACE ALL BLOG DATA",
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
    id = Validate(isID, id);

    // JOI VALIDATE TITLE
    title = Validate(isBlogTitle, title);

    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog)
      throw new ResponseError(404, `Blog with ID ${id} is not found`);

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
    let id = req.params.id;

    // JOI VALIDATE ID
    id = Validate(isID, id);

    // check if current blog is available
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!currentBlog)
      throw new ResponseError(404, `Blog with ID ${id} is not found`);

    // DELETE EXECUTION
    const deleteBlog = await Prisma.blog.delete({ where: { id } });
    res.status(200).json({
      message: `DELETE DATA WITH ID ${id} IS SUCCESSFUL`,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getByPage,
  get,
  post,
  put,
  updateTitle,
  remove,
};
