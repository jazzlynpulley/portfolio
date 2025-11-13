export const twoSum = (nums: number[], target: number): number[] => {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }

  return [0, 0];
};

const parseInputString = (input: string): { n: number[]; t: number } => {
  const numsMatch = input.match(/n=\[(.*?)\]/);
  const targetMatch = input.match(/t=(\d+)/);

  if (!numsMatch || !targetMatch) {
    throw new Error('Invalid format: expected something like "n=[2,7,11,15]t=9"');
  }

  const n = numsMatch[1]
    .split(',')
    .map((num) => Number(num.trim()))
    .filter((num) => !isNaN(num));

  const t = Number(targetMatch[1]);

  return { n, t };
};

const arraysEqual = (a: number[], b: number[]) => {
  if (a && b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, i) => val === b[i])
    );
  }
  return false;
};

// this function will convert the string answers to the expected input and return a boolean if the answer is correct
export const validateAnswer = (input: string, output: string): boolean => {
  // parse inputs to their expected types
  const parsedInput = parseInputString(input);
  const inputtedSolution = twoSum(parsedInput.n, parsedInput.t);

  const parsedOutput: number[] = JSON.parse(output);
  const reversedParsedOutput = [...parsedOutput].reverse();
  return (
    arraysEqual(inputtedSolution, parsedOutput) ||
    arraysEqual(inputtedSolution, reversedParsedOutput)
  );
};
