import fs from "fs/promises";

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

export default { removeFile, createUploads };
