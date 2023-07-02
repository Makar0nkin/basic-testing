// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
// import { doStuffByInterval, doStuffByTimeout } from './index';
import path from 'node:path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fn = jest.fn((callback: () => void, timeout: number) =>
      doStuffByTimeout(callback, timeout),
    );
    const callback = jest.fn(() => {
      console.log('Callback');
    });
    fn(callback, 1000);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn(() => {
      console.log('Callback');
    });
    const fn = jest.fn((callback: () => void, timeout: number) =>
      doStuffByTimeout(callback, timeout),
    );

    fn(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(fn).toHaveBeenLastCalledWith(callback, 1000);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn(() => {
      console.log('Callback');
    });
    const fn = jest.fn((callback: () => void, timeout: number) =>
      doStuffByInterval(callback, timeout),
    );
    fn(callback, 1000);
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn(() => {
      console.log('Callback');
    });
    const fn = jest.fn((callback: () => void, timeout: number) =>
      doStuffByInterval(callback, timeout),
    );
    const timeAdvance = 3;
    const timeout = 1000;

    fn(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeAdvance * timeout);

    expect(callback).toHaveBeenCalledTimes(timeAdvance);
    expect(fn).toHaveBeenLastCalledWith(callback, 1000);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'C:\\file';
    const pathSpy = jest.spyOn(path, 'join');
    expect(pathSpy).toHaveBeenCalledTimes(0);
    await readFileAsynchronously(pathToFile);
    expect(pathSpy).toHaveBeenCalledTimes(1);
    expect(pathSpy).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously('what?')).resolves.toBeNull;
  });

  test('should return file content if file exists', async () => {
    const fileCont = "I'm working";
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockResolvedValue(fileCont);
    const result = await readFileAsynchronously('I am a miracle');
    expect(result).toBe(fileCont);
  });
});
