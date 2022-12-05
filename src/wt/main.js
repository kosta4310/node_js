import { cpus } from "node:os";
import { Worker } from "node:worker_threads";
import path from "path";
import { getDirname } from "../additional/funcDirname.js";

const __dirname = getDirname(import.meta.url);
const workerPath = path.resolve(__dirname, "worker.js");

const performCalculations = async () => {
  const numberCores = cpus().length;
  const arrPromises = [];

  for (let i = 1; i <= numberCores; i++) {
    const threadPromise = new Promise((resolve, reject) => {
      const worker = new Worker(workerPath, { workerData: 10 + i });

      worker.on("message", (data) => resolve({ status: "resolved", data }));
      worker.on("error", () => reject({ status: "error", data: null }));
      worker.on("exit", (code) => {
        if (code !== 0) reject({ status: "error", data: null });
      });
    });

    arrPromises.push(threadPromise);
  }
  try {
    const resArray = await Promise.allSettled(arrPromises);
    const res = resArray.map((obj) => {
      if (obj.status === "fulfilled") {
        return obj.value;
      }
      return obj.reason;
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

await performCalculations();
