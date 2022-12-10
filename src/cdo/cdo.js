import { resolve } from "path";
import { cwd } from "process";
import { compress } from "../zip/compress.js";
import { decompress } from "../zip/decompress.js";

export async function cdo(splittenLine) {
  const [command, ...path] = splittenLine;
  if (!path.length || path.length !== 2) {
    console.log("Invalid input");
    return;
  }
  const [firstArgument, secondArgument] = path;
  const pathToFile = resolve(cwd(), firstArgument);
  const pathToDestination = resolve(cwd(), secondArgument);

  switch (command) {
    case "compress":
      await compress(pathToFile, pathToDestination);
      break;

    case "decompress":
      await decompress(pathToFile, pathToDestination);
      break;

    default:
      break;
  }
}
