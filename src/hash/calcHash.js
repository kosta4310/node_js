import { createReadStream } from "node:fs";
import { stdout } from "node:process";
const { createHash } = await import("node:crypto");
import { resolve } from "node:path";
import { cwd } from "node:process";
import { pipeline } from "node:stream/promises";

const calculateHash = async (pathToFile) => {
  const hash = createHash("sha256");
  const input = createReadStream(pathToFile);
  await pipeline(input, hash.setEncoding("hex"), stdout);

  // input.pipe(hash).setEncoding("hex").pipe(stdout);
};

export async function calcHash(splittenLine) {
  const [_, ...path] = splittenLine;
  const [path_to_file] = path;
  const pathToFile = resolve(cwd(), path_to_file);
  if (!path || path.length > 1) {
    console.log("Invalid input");
  } else {
    await calculateHash(pathToFile).catch((err) => console.log(err));
  }
}
