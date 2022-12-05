import { Transform, pipeline } from "node:stream";
import { createUnzip } from "node:zlib";
import { EOL } from "node:os";
import path from "path";
import { stdin, stdout } from "node:process";
import { getDirname } from "../additional/funcDirname.js";
import { createReadStream, createWriteStream } from "node:fs";

const __dirname = getDirname(import.meta.url);

const decompress = async () => {
  const filePathOut = path.resolve(__dirname, "files/fileToCompress.txt");
  const filePathIn = path.resolve(__dirname, "files/archive.gz");
  const rs = createReadStream(filePathIn);
  const ws = createWriteStream(filePathOut);
  const transformStream = createUnzip();

  pipeline(rs, transformStream, ws, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

await decompress();
