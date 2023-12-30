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
    if(!Number(id)){
      return res.status(400).json({
        message: 'ID is invalid'
      })
    }
    if(isNaN(id)){
      return res.status(400).json({
        message: 'ID is invalid'
      })
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
const post = (req, res) => {
  res.status(200).json({
    message: "BERHASIL SAVE BLOG BARU",
  });
};

// PUT METHOD BLOGS
const put = (req, res) => {
  res.status(200).json(blogsMessage);
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
