import { Prisma } from "../app/prisma.js";

const blogsMessage = { message: "OK from Blogs Page", status: 200 };
// GETALL METHOD BLOGS
const getAll = async (req, res) => {
  try {
    // FIND MANY >> ambil semua blog
    const datas = await Prisma.blog.findMany();
    res.status(200).json({
      message: "BERHASIL MENDAPATKAN SEMUA DATA BLOG",
      blogs: datas,
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
    if (!Number(id)) {
      return res.status(400).json({
        message: "ID is invalid : not Number",
      });
    }
    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID is invalid : Not a Number",
      });
    }
    id = Number(id);
    // atau id = parseInt(id);
    const blog = await Prisma.blog.findUnique({
      where: { id },
    });
    // HANDLE NOT FOUND
    if (blog == null) {
      return res.status(404).json({
        message: `TIDAK ADA DATA BLOG ${id}`,
      });
    }
    res.status(200).json({
      message: "BERHASIL MENDAPATKAN DATA BLOG DENGAN ID",
      blog: blog,
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
    const blog = req.body;
    if (!blog.title || !blog.content) {
      return res.status(400).json({
        message: "Please fill title and content box",
      });
    }
    if (blog.title.length < 3 || blog.content.length < 3) {
      return res.status(400).json({
        message: "Title or content must contain at least 3 characters or more",
      });
    }
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
    const blog = req.body;
    let id = req.params.id;
    if (isNaN(id)) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "ID is invalid : Not a Number",
      });
    }
    id = Number(id);

    if (!blog.title || !blog.content) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "Please fill title and content box",
      });
    }
    if (blog.title.length < 3 || blog.content.length < 3) {
      // 400 BAD REQUEST
      return res.status(400).json({
        message: "Title or content must contain at least 3 characters or more",
      });
    }
    const currentBlog = await Prisma.blog.findUnique({
      where: { id },
      select: { id: true },
    });
    console.log(currentBlog)
    if (!currentBlog) {
      // 404 BLOG NOT FOUND
      return res.status(404).json({
        message: `Blog with ID ${id} is not found`,
      });
    }
    const update = await Prisma.blog.update({
      where: {id},
      data: blog
    })

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
const patch = (req, res) => {
  res.status(200).json(blogsMessage);
};

// DELETE METHOD BLOGS
const remove = (req, res) => {
  res.status(200).json(blogsMessage);
};

export default {
  getAll,
  get,
  post,
  put,
  patch,
  remove,
};
