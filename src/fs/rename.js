import fs from "fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const rename = async () => {
  const oldName = path.resolve(__dirname, "./files/wrongFilename.txt");
    const newName = path.resolve(__dirname, "./files/properFilename.md");
    try {
        const dirents = await fs.readdir(path.dirname(newName));
        if (dirents.includes(path.basename(newName))) {
            throw new Error()
        }
    } catch (error) {
        throw new Error("FS operation failed");
    }

  try {
    await fs.rename(oldName, newName);
  } catch (error) {
    if ((error.code === "ENOENT") | (error.code === "EEXIST")) {
      throw new Error("FS operation failed");
    }
  }
};

await rename();
