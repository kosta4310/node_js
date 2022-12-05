import fs from "fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

export const copy = async () => {
  try {
    const dirents = await fs.readdir(path.join(__dirname, "files"), {
      withFileTypes: true,
    });
    await fs.mkdir(path.resolve(__dirname, "./files_copy"));
    dirents.forEach(async (dirent) => {
        const data = fs.readFile(path.resolve(__dirname, `./files/${dirent.name}`));
          await fs.writeFile(
            path.resolve(__dirname, `./files_copy/${dirent.name}`), data );
    });
  } catch (error) {
    if (error.code === "ENOENT" | error.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
  }
};
copy();
