import { parseArgs } from "./cli/args.js";
import { homedir } from "node:os";
import { handleLine } from "./handleLine.js";

const name = parseArgs();

console.log(`Welcome to the File Manager, ${name}!`);

process.chdir(homedir());

console.log(`You are currently in ${homedir()}`);
handleLine(name);
