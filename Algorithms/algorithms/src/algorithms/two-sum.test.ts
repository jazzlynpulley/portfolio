import { expect, test } from 'vitest';
import { twoSum } from './two-sum';

test('adds 1 + 2 to equal 3', () => {
  const result = twoSum([2, 7, 11, 15], 9);
  expect(result[0]).toBe(0);
  expect(result[1]).toBe(1);
});
