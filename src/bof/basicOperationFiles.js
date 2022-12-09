import { read } from "../fs/read.js";
import { cwd } from "node:process";
import { create } from "../fs/create.js";
import { move } from "../fs/move.js";
import { resolve } from "node:path";
import { rename } from "../fs/rename.js";
import { copy } from "../fs/copy.js";
import { remove } from "../fs/delete.js";

export async function bof(splittenLine) {
  const [command, ...path] = splittenLine;
  const [firstArgument, secondArgument] = path;
  const pathToFile = resolve(cwd(), firstArgument);

  switch (command) {
    case "cat":
      if (!path || path.length > 1) {
        console.log("Invalid input");
      } else {
        await read(pathToFile);
      }
      break;

    case "add":
      if (!path || path.length > 1) {
        console.log("Invalid input");
      } else {
        await create(pathToFile);
      }
      break;

    case "rn":
      if (path && path.length === 2) {
        await rename({ pathToFile, secondArgument });
      } else {
        console.log("Invalid input");
      }
      break;

    case "cp":
      if (path && path.length === 2) {
        await copy([pathToFile, secondArgument]).catch(() =>
          console.log("Operation failed")
        );
      } else {
        console.log("Invalid input");
      }
      break;

    case "mv":
      if (path && path.length === 2) {
        await move([pathToFile, secondArgument]);
      } else {
        console.log("Invalid input");
      }
      break;

    case "rm":
      if (!path || path.length > 1) {
        console.log("Invalid input");
      } else {
        await remove(pathToFile);
      }
      break;

    default:
      break;
  }
}
