import { resolve } from "path";
import { cwd } from "process";
import { copy } from "./copy.js";
import { remove } from "./delete.js";

export async function move([path_to_file, path_to_new_directory]) {
  const pathToNewDirecory = resolve(cwd(), path_to_new_directory);
  try {
    await copy([path_to_file, pathToNewDirecory]);
    await remove(path_to_file);
  } catch (error) {
    console.log("Operation failed");
  }
}
