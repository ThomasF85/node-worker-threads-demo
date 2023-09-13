export function getNumberArray(firstNumber: number, length: number): number[] {
  const numbers: number[] = [];
  for (let i = 0; i < length; i++) {
    numbers.push(firstNumber + i);
  }
  return numbers;
}

export function chunkify(array: number[], chunks: number): number[][] {
  const chunked: number[][] = [];
  for (let i = 0; i < array.length; i++) {
    const chunkIndex = i % chunks;
    if (!chunked[chunkIndex]) {
      chunked[chunkIndex] = [];
    }
    chunked[chunkIndex].push(array[i]);
  }
  return chunked;
}
