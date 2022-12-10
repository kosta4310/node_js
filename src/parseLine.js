import { nwd } from "./nwd/nwd.js";
import { bof } from "./bof/basicOperationFiles.js";
import { osi } from "./osi/osi.js";
import { calcHash } from "./hash/calcHash.js";
import { cdo } from "./cdo/cdo.js";

export async function parseLine(data) {
  const splittenLine = data.split(" ");
  const [command] = splittenLine;
  if ("up cd ls".split(" ").includes(command)) {
    await nwd(splittenLine);
  } else if ("cat add rn cp mv rm".split(" ").includes(command)) {
    await bof(splittenLine);
  } else if ("compress decompress".split(" ").includes(command)) {
    await cdo(splittenLine);
  } else {
    switch (command) {
      case "os":
        osi(splittenLine);
        break;

      case "hash":
        await calcHash(splittenLine);
        break;

      default:
        console.log("Invalid input");
        break;
    }
  }
}
