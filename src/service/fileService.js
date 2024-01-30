import fs from "fs/promises";
import multer from "multer";


const createUploads = async (folderName) => {
  try {
    // try access folder
    await fs.access(folderName);
  } catch (error) {
    // if error, create new
    await fs.mkdir(folderName);
  }
};

const removeFile = async (file) => {
  try {
    // delete execution
    await fs.rm("./" + file);
  } catch (error) {
    // throw error if delete is error
    // throw (error);
    console.log("error deleting data")
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // date + random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // get file extension
    const ext = file.originalname.split(".").pop();

    // create file name
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const upload = multer({ storage: storage });

export default { removeFile, createUploads, upload };
