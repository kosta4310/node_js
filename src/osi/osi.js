import { EOL, homedir, userInfo, arch } from "node:os";
import { processorInfo } from "./cpus.js";

export function osi(splittenLine) {
  const [_, ...path] = splittenLine;

  if (path.length !== 1) {
    console.log("Invalid input");
    return;
  }

  const [argument] = path;

  switch (argument) {
    case "--EOL":
      console.log({ EOL });
      break;

    case "--cpus":
      console.log(processorInfo());
      break;

    case "--homedir":
      console.log({ homedir: homedir() });
      break;

    case "--username":
      const { username } = userInfo();
      console.log({ username });
      break;

    case "--architecture":
      console.log({ architecture: arch() });
      break;

    default:
      console.log("Invalid input");
      break;
  }
}
