import { Worker } from "worker_threads";
import { chunkify, getNumberArray } from "./utils";

const CHUNKS = 4;
const ITERATIONS = 300000000;

const numbersArray: number[] = getNumberArray(ITERATIONS, 100);
const chunks: number[][] = chunkify(numbersArray, CHUNKS);

runSingleThreaded(numbersArray);
//runMultiThreaded(chunks);

async function runMultiThreaded(chunks: number[][]) {
  console.log(`Running on ${CHUNKS} threads`);
  const time = performance.now();
  const sums: number[] = await Promise.all(
    chunks.map((chunk) => {
      return new Promise<number>((resolve) => {
        const worker = new Worker(`${__dirname}/worker.js`);
        worker.postMessage(chunk);
        worker.on("message", (sum: number) => {
          resolve(sum);
          worker.terminate();
        });
      });
    })
  );
  console.log(
    "Result:",
    sums.reduce((a, b) => a + b, 0)
  );
  console.log("time taken: ", performance.now() - time);
}

function runSingleThreaded(numbers: number[]) {
  console.log(`Running on single thread`);
  const time = performance.now();
  let sum = 0;
  for (const number of numbers) {
    for (let i = 0; i < number; i++) {
      sum += 0.00001 * i;
    }
  }
  console.log("Result:", sum);
  console.log("time taken: ", performance.now() - time);
}
