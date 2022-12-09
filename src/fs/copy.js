import { createReadStream, createWriteStream } from "fs";
import { resolve, basename } from "path";
import { pipeline } from "stream/promises";

export const copy = async ([path_to_file, path_to_new_directory]) => {
  const pathToNewFile = resolve(path_to_new_directory, basename(path_to_file));
  const readStream = createReadStream(path_to_file);
  const writeStream = createWriteStream(pathToNewFile, { flags: "wx" });

  await pipeline(readStream, writeStream);
};
