import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import path from "path";
import { createReadStream, createWriteStream } from "node:fs";

export const compress = async (pathToFile, pathToDestination) => {
  try {
    const initialNameFile = path.basename(pathToFile);

    const pathToFileOut = path.resolve(
      pathToDestination,
      `${initialNameFile}.br`
    );

    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathToFileOut, { flags: "wx" });
    const transformStream = createBrotliCompress();

    await pipeline(rs, transformStream, ws);
  } catch (error) {
    console.log("Operation failed");
  }
};
