import { fork } from "child_process";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);

const spawnChildProcess = async (args) => {
  fork(path.resolve(__dirname, "files/script.js"), args);
};

spawnChildProcess(["I", "am", "learning", "node.js"]);
