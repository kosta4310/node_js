import { dirname } from "path";
import { fileURLToPath } from "url";



export function getDirname(metUrl) {
  const __filename = fileURLToPath(metUrl);
  const __dirname = dirname(__filename);
  return __dirname;
}
 
export function getFilename(metUrl) {
  const __filename = fileURLToPath(metUrl);
  return __filename;
}
