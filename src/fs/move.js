import { copy } from "./copy.js";
import { remove } from "./delete.js";

export async function move([path_to_file, path_to_new_directory]) {
  await copy([path_to_file, path_to_new_directory])
    .then(async () => await remove(path_to_file))
    .catch(() => console.log("Operation failed"));
}
