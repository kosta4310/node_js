import { nwd } from "./nwd/nwd.js";
import { bof } from "./bof/basicOperationFiles.js";

export async function parseLine(data) {
  const splittenLine = data.split(" ");
  const [command] = splittenLine;
  if ("up cd ls".split(" ").includes(command)) {
    await nwd(splittenLine);
  } else if ("cat add rn cp mv rm".split(" ").includes(command)) {
    await bof(splittenLine);
  } else console.log("Invalid input");
}
