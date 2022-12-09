import { read } from "../fs/read.js";
import { cwd } from "node:process";
import { create } from "../fs/create.js";
import { move } from "../fs/move.js";
import { resolve } from "node:path";
import { rename } from "../fs/rename.js";
import { copy } from "../fs/copy.js";

export async function bof(splittenLine) {
  const [command, ...path] = splittenLine;
  const [firstArgument, secondArgument] = path;
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
        const pathToFile = resolve(cwd(), firstArgument);
        await create(pathToFile);
      }
      break;

    case "rn":
      if (path && path.length === 2) {
        await rename({ firstArgument, secondArgument });
      } else {
        console.log("Invalid input");
      }
      break;

    case "cp":
      if (path && path.length === 2) {
        await copy([firstArgument, secondArgument]).catch(() =>
          console.log("Operation failed")
        );
      } else {
        console.log("Invalid input");
      }
      break;

    case "mv":
      if (path && path.length === 2) {
        await move([firstArgument, secondArgument]);
      } else {
        console.log("Invalid input");
      }
      break;

    default:
      break;
  }
}
