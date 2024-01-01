import { Prisma } from "../app/prisma.js";
import Joi from "joi";

const blogsMessage = { message: "OK from Blogs Page", status: 200 };
// GETALL METHOD BLOGS
const getAll = async (req, res) => {
  try {
    // FIND MANY >> ambil semua blog
    const datas = await Prisma.blog.findMany();
    res.status(200).json({
      message: "SUCCESS GET ALL DATA BLOG",
      data: datas,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error: ${error.message}`,
    });
  }
};
// GET METHOD BLOG BY ID
const get = async (req, res) => {
  // IF SERVER IS OK
  try {
    let id = req.params.id;
    
    // START : JOI VALIDATE ID
    const schema = Joi.number().min(1).required();
    const validate = schema.validate(id);

    if (validate.error) {
      return res.status(400).json({
        message: validate.error.message,
      });
    }

    id = validate.value;
    // END : JOI VALIDATE ID

    const blog = await Prisma.blog.findUnique({
      where: { id },
    });
    // HANDLE NOT FOUND
    if (blog == null) {
      return res.status(404).json({
        message: `NO DATA BLOG ${id}`,
      });
    }
    res.status(200).json({
      message: `SUCCESS GET BLOG DATA BY ID : ${id}`,
      data: blog,
    });
  } catch (error) {
    // IF SERVER IS DOWN
    res.status(500).json({
      message: `Server error : ${error.message}`,
    });
  }
};

// POST METHOD BLOGS
const post = async (req, res) => {
  try {
    let blog = req.body;

    // START : JOI VALIDATE BLOG
    // USING OBJECT VALIDATION

    const schemaBlog = Joi.object({
      title: Joi.string().positive().trim().max(255).required().label("Title"),
      content: Joi.string().min(3).required().label("Content")
    })
    const blogValidate = schemaBlog.validate(blog,{
      abortEarly: false
    })

    if(blogValidate.error){
      return res.status(400).json({
        message: blogValidate.error.message
      })
    }
    blog = blogValidate.value
    // END : JOI VALIDATE BLOG
    
    const newBlog = await Prisma.blog.create({
      data: blog,
    });
    res.status(200).json({
      message: "BERHASIL MENYIMPAN DATA BLOG BARU",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: `Server error : ${error.message}`,
    });
  }
};

// PUT METHOD BLOGS
const put = async (req, res) => {
  try {
    let blog = req.body;
    let id = req.params.id;

    // START: JOI VALIDATE ID
    const schema = Joi.number().min(1).required();
    const validate = schema.validate(id);

    if (validate.error) {
      return res.status(400).json({
        message: validate.error.message,
      });
    }

    id = validate.value;
    // END: JOI VALIDATE ID
    
    // START : JOI VALIDATE BLOG
    // USING OBJECT VALIDATION

    const schemaBlog = Joi.object({
      title: Joi.string().positive().trim().max(255).required().label("Title"),
      content: Joi.string().min(3).required().label("Content")
    })
    const blogValidate = schemaBlog.validate(blog,{
      abortEarly: false
    })

    if(blogValidate.error){
      return res.status(400).json({
        message: blogValidate.error.message
      })
    }
    blog = blogValidate.value
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
    res.status(500).json({
      message: "Server error : " + error.message,
    });
  }
};

// PATCH METHOD BLOGS
const updateTitle = async (req, res) => {
  try {
    const blog = req.body;

    let id = req.params.id;
    if (isNaN(id)) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "ID is invalid : Not a Number",
      });
    }
    id = Number(id);

    if (!blog.title) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "Please fill title box",
      });
    }
    if (blog.title.length < 3) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "Title must contain at least 3 characters or more",
      });
    }
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
      data: blog,
    });
    res.status(200).json({
      message: `UPDATE TITLE BLOG ID ${id} SUCCESSFUL`,
      data: updateTitle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error : " + error.message,
    });
  }
};

// DELETE METHOD BLOGS
const remove = async (req, res) => {
  try {
    const blog = req.body;
    let id = req.params.id;
    if (isNaN(id)) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "ID is invalid : Not a Number",
      });
    }
    id = Number(id);
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
    res.status(500).json({
      message: "Server error : " + error.message,
    });
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
