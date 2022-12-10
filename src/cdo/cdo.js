import { resolve } from "path";
import { cwd } from "process";

export async function cdo(splittenLine) {
  const [command, ...path] = splittenLine;
  if (!path || path.length !== 2) {
    console.log("Invalid input");
    return;
  }
  const [firstArgument, secondArgument] = path;
  const pathToFile = resolve(cwd(), firstArgument);
  const pathToDestination = resolve(cwd(), secondArgument);
}
