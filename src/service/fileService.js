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

export default { createUploads };
