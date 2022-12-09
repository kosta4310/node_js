import fs from "fs/promises";

export const remove = async (path_to_file) => {
  try {
    await fs.rm(path_to_file);
  } catch (error) {
    console.log("Operation failed");
  }
};
