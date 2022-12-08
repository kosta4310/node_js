import { cwd, chdir } from "node:process";
import { dirname, resolve } from "node:path";

export function nwd(splittenLine) {
  const [command, path] = splittenLine;
  switch (command) {
    case "up":
      if (path) {
        console.log("Invalid input");
      } else {
        chdir(dirname(cwd()));
      }
      break;

    case "cd":
      if (!path) {
        console.log("Invalid input");
      } else {
        try {
          chdir(resolve(cwd(), path));
        } catch (error) {
          console.log("Invalid input");
        }
      }
      break;

    case "ls":
      if (path) {
        console.log("Invalid input");
      } else {
        chdir(dirname(cwd()));
      }
      break;

    default:
      break;
  }
}
