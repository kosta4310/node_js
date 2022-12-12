import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";
import path from "path";
import { createReadStream, createWriteStream } from "node:fs";

export const decompress = async (pathToFile, pathToDestination) => {
  const initialNameFile = path.basename(pathToFile);
  const newNameFile = initialNameFile.replace(".br", "");

  const pathToFileOut = path.resolve(pathToDestination, newNameFile);

  const rs = createReadStream(pathToFile);
  const ws = createWriteStream(pathToFileOut, { flags: "wx" });
  const transformStream = createBrotliDecompress();

  await pipeline(rs, transformStream, ws).catch(() =>
    console.log("Operation failed")
  );
};
