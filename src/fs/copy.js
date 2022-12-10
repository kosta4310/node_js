import { createReadStream, createWriteStream } from "fs";
import { cwd } from "process";
import { resolve, basename } from "path";
import { pipeline } from "stream/promises";

export const copy = async ([path_to_file, path_to_new_directory]) => {
  const pathToNewFile = resolve(
    cwd(),
    path_to_new_directory,
    basename(path_to_file)
  );
  const readStream = createReadStream(path_to_file);
  const writeStream = createWriteStream(pathToNewFile, { flags: "wx" });

  await pipeline(readStream, writeStream).catch(() =>
    console.log("Operation failed")
  );
};
