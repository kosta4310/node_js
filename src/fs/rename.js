import fs from "fs/promises";
import { dirname, basename, resolve } from "path";

export const rename = async ({ firstArgument, secondArgument }) => {
  const pathToOldFile = firstArgument;
  const pathToNewFile = resolve(dirname(pathToOldFile), secondArgument);

  try {
    const files = await fs.readdir(dirname(pathToOldFile));
    if (files.includes(secondArgument)) {
      throw new Error("Operation failed");
    }
    await fs.rename(pathToOldFile, pathToNewFile);
  } catch (error) {
    console.log("Operation failed");
  }
};
