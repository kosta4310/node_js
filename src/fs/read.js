import fs from "fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const read = async () => {
    const pathFile = path.resolve(__dirname, "./files/fileToRead.txt");
  try {
      const text = await fs.readFile(pathFile, 'utf-8');
      console.log(text);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
  }
};

await read();
