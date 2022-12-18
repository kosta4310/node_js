import { writeFile } from "node:fs/promises";

export const create = async (pathToFile) => {
  try {
    await writeFile(pathToFile, "", { flag: "wx" });
  } catch (error) {
    console.log("Operation failed");
  }
};
