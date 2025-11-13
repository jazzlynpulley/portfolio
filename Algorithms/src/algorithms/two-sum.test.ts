import { expect, test } from 'vitest';
import { twoSum, validateAnswer } from './two-sum';

test('twoSum returns the expected result with 1 possible answer', () => {
  const result = twoSum([2, 7, 11, 15], 9);
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(1);
});

test('twoSum returns the expected result with no possible answer', () => {
  const result = twoSum([2, 7, 11, 15], 14);
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(0);
});

test('validateAnswer correctly validates a correct answer', () => {
  const result = validateAnswer('n=[2,7,11,15]t=9', '[0,1]');
  expect(result).toBe(true);
});

test('validateAnswer correctly validates a correct answer in any order', () => {
  const result = validateAnswer('n=[2,7,11,15]t=9', '[1,0]');
  expect(result).toBe(true);
});

test('validateAnswer correctly validates an incorrect answer', () => {
  const result = validateAnswer('n=[2,7,11,15]t=18', '[0,1]');
  expect(result).toBe(false);
});
