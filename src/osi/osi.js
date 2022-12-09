import { EOL, homedir, userInfo, arch } from "node:os";
import { processorInfo } from "./cpus.js";

export function osi(splittenLine) {
  const [command, ...path] = splittenLine;
  const [argument] = path;
  if (!path || path.length > 1) {
    console.log("Invalid input");
    return;
  }
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
      break;
  }
}
