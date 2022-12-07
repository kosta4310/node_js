import { parseArgs } from './cli/args.js';
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const name = parseArgs();
const rl = readline.createInterface({ input, output });
const answer = await rl.question('hello');
console.log(answer);
rl.close();

