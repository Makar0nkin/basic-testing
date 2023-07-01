// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)('should blah-blah', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a: a, b: b, action: action })).toBe(expected);
  });
});
