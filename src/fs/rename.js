import fs from "fs/promises";
import { dirname, resolve } from "path";

export const rename = async ({ pathToFile, secondArgument }) => {
  const pathToNewFile = resolve(dirname(pathToFile), secondArgument);

  try {
    const files = await fs.readdir(dirname(pathToFile));
    if (files.includes(secondArgument)) {
      throw new Error("Operation failed");
    }
    await fs.rename(pathToFile, pathToNewFile);
  } catch (error) {
    console.log("Operation failed");
  }
};
