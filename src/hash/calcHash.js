import { createReadStream } from "node:fs";
import path from "path";
import { stdout } from "node:process";
const { createHash } = await import("node:crypto");
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const calculateHash = async () => {
    const hash = createHash('sha256');
    const input = createReadStream(path.resolve(__dirname, "files/fileToCalculateHashFor.txt"));
    input.pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();
