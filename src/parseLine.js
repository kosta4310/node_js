import { nwd } from "./nwd/nwd.js";

export function parseLine(data) {
  const splittenLine = data.split(" ");
  const [command] = splittenLine;
  if ("up cd ls".split(" ").includes(command)) {
    nwd(splittenLine);
  } else console.log("Invalid input");
}
