// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

// passed
describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const ioData = 'a';
    return expect(resolveValue(ioData)).resolves.toBe(ioData);
  });
});

// NOT passed
describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'Error: this is error message!';
    expect(() => throwError(errMsg)).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defErrMag = 'Oops!';
    expect(() => throwError()).toThrow(defErrMag);
  });
});

// NOT passed
describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

// passed
describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
