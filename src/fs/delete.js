import fs from "fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const remove = async () => {
    const deletedPath = path.resolve(__dirname, "./files/fileToRemove.txt");
  try {
      await fs.rm(deletedPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await remove();
