import { Prisma } from "../app/prisma.js";

const blogsMessage = { message: "OK from Blogs Page", status: 200 };

/*
ive tried so hard and got so fast but in the end it doesnt even matter

*/

// GETALL METHOD BLOGS
const getAll = async (req, res) => {
  // FIND MANY >> ambil semua blog
  const datas = await Prisma.blog.findMany();
  res.status(200).json({
    message: "BERHASIL MENDAPATKAN SEMUA DATA BLOG",
    blogs: datas,
  });
};
// GET METHOD BLOG BY ID
const get = async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  // FINDUNIQUE >> AMBIL BLOG BERDASARKAN ID
  const blog = await Prisma.blog.findUnique({
    where: { id },
  });
  if (blog == null) {
    res.status(404).json({
      message: `TIDAK ADA DATA BLOG ${id}`,
      
    });
  }
  res.status(200).json({
    message: "BERHASIL MENDAPATKAN DATA BLOG DENGAN ID",
    blog: blog,
  });
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
