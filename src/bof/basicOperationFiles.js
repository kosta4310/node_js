import { read } from "../fs/read.js";
import { cwd } from "node:process";
import { resolve } from "node:path";

export async function bof(splittenLine) {
  const [command, path] = splittenLine;
  switch (command) {
    case "cat":
      if (!path) {
        console.log("Invalid input");
      } else {
        const pathFile = resolve(cwd(), path);
        await read(pathFile);
      }
      break;

    default:
      break;
  }
}
