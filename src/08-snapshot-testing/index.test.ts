// Uncomment the code below and write your tests
import { generateLinkedList } from './index';
const input = ['big', 'sweaty', 'ball'];
const output = {
  value: 'big',
  next: {
    value: 'sweaty',
    next: {
      value: 'ball',
      next: {
        value: null,
        next: null,
      },
    },
  },
};

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(input)).toStrictEqual(output);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(input)).toMatchSnapshot();
  });
});
