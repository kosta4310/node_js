import * as readline from "node:readline/promises";
import { parseLine } from "./parseLine.js";
import { EOL, homedir } from "node:os";
import { cwd, stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

export function handleLine(name) {
  rl.on("line", async (data) => {
    if (data === ".exit") {
      rl.emit("SIGINT");
    } else {
      await parseLine(data);
      console.log(`You are currently in ${cwd()}`);
    }
  });
  rl.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${name}, goodbye!`);
    rl.close();
  });
}
