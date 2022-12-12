import { cwd, chdir } from "node:process";
import { dirname, resolve } from "node:path";
import { list } from "../fs/list.js";

export async function nwd(splittenLine) {
  const [command, ...path] = splittenLine;
  switch (command) {
    case "up":
      if (path.length) {
        console.log("Invalid input");
      } else {
        chdir(dirname(cwd()));
      }
      break;

    case "cd":
      if (path.length !== 1) {
        console.log("Invalid input");
      } else {
        try {
          chdir(resolve(cwd(), path[0]));
        } catch (error) {
          console.log("Operation failed");
        }
      }
      break;

    case "ls":
      if (path.length) {
        console.log("Invalid input");
      } else {
        await list(cwd());
      }
      break;

    default:
      break;
  }
}
