import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import path from "path";
import { createReadStream, createWriteStream } from "node:fs";

export const compress = async (pathToFile, pathToDestination) => {
  const initialNameFile = path.basename(pathToFile);
  const newNameFile = initialNameFile.replace(
    path.extname(initialNameFile),
    ".br"
  );

  const pathToFileOut = path.resolve(pathToDestination, newNameFile);

  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(pathToFileOut, { flags: "wx" });
  const transformStream = createBrotliCompress();

  await pipeline(rs, transformStream, ws).catch(() =>
    console.log("Operation failed")
  );
};
