import fs from "fs/promises";

export const read = async (pathFile) => {
  try {
    const text = await fs.readFile(pathFile, "utf-8");
    console.log(text);
  } catch (error) {
    console.log("Operation failed");
  }
};
