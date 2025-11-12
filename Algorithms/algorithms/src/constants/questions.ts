import { twoSum } from '../algorithms';
import { QuestionTypes } from 'types';

export const QUESTION_DICTIONARY: Record<number, QuestionTypes.TQuestionItem> = {
  1: {
    name: 'Two Sum',
    prompt:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. <br /> You may assume that each input would have exactly one solution, and you may not use the same element twice. <br />You can return the answer in any order.',
    algorithm: twoSum,
  },
};
