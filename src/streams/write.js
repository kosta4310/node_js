import { createWriteStream } from "node:fs";
import path from "path";
import { stdin } from "node:process";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const write = async () => {
  const filePath = path.resolve(__dirname, "files/fileToWrite.txt");
  const writeStream = createWriteStream(filePath);
  stdin.pipe(writeStream);
};

await write();
