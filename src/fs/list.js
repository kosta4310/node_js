import fs from "fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const list = async () => {
    const pathToFolder = path.resolve(__dirname, './files');
  try {
      const files = await fs.readdir(pathToFolder);
      console.log(files);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await list();
