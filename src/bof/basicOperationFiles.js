import { read } from "../fs/read.js";
import { cwd } from "node:process";
import { create } from "../fs/create.js";
import { dirname, resolve } from "node:path";

export async function bof(splittenLine) {
  const [command, ...path] = splittenLine;
  const [firstArgument] = path;
  switch (command) {
    case "cat":
      if (!path) {
        console.log("Invalid input");
      } else {
        const pathFile = resolve(cwd(), firstArgument);
        await read(pathFile);
      }
      break;

    case "add":
      if (!path) {
        console.log("Invalid input");
      } else {
        const pathToFile = resolve(dirname(cwd()), firstArgument);
        await create(pathToFile);
      }
      break;

    case "rn":
      if (path && path.length === 2) {
        console.log(path);
      } else {
        console.log("Invalid input");
      }
      break;

    default:
      break;
  }
}
