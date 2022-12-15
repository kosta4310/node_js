import url from "node:url";

export function getDirname(str: string) {
  const __filename = url.fileURLToPath(str);
  const __dirname = url.fileURLToPath(new URL(".", str));
  return __dirname;
}
