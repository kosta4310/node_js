import { createReadStream } from "node:fs";
import path from "path";
import { stdout } from "node:process";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const read = async () => {
  const filePath = path.resolve(__dirname, "files/fileToRead.txt");
  const readStream = createReadStream(filePath);
  readStream.pipe(stdout);
};

await read();
