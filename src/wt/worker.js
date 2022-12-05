import { parentPort, workerData } from "node:worker_threads";
// Можно раскомментировать код и проверить корректность работы при ошибке в воркере

const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  // if (workerData === 12) {
  //   throw new Error("error in worker");
  // }
  parentPort.postMessage(nthFibonacci(workerData));
};

sendResult();
