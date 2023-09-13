import { parentPort } from "worker_threads";

parentPort!.on("message", (summands: number[]) => {
  let sum = 0;
  for (const summand of summands) {
    for (let i = 0; i < summand; i++) {
      sum += 0.00001 * i;
    }
  }
  parentPort!.postMessage(sum);
});
