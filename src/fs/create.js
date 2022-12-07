import { writeFile } from "node:fs/promises";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const create = async () => {
    try {
    await writeFile(path.resolve(__dirname, "./files/fresh.txt"), "I am fresh and young", {flag: 'wx'});
  } catch (error) {
    if(error.code === 'EEXIST') throw new Error("FS operation failed");
    
  }
};

create();



