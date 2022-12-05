import { Transform, pipeline } from "node:stream";
import { createGzip } from "node:zlib";
import { EOL } from "node:os";
import path from "path";
import { stdin, stdout } from "node:process";
import { getDirname } from "../additional/funcDirname.js";
import { createReadStream, createWriteStream } from "node:fs";

const __dirname = getDirname(import.meta.url);

const compress = async () => {
  const filePathIn = path.resolve(__dirname, "files/fileToCompress.txt");
  const filePathOut = path.resolve(__dirname, "files/archive.gz");
  const rs = createReadStream(filePathIn);
  const ws = createWriteStream(filePathOut);
  const transformStream = createGzip();

  pipeline(rs, transformStream, ws, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

await compress();
