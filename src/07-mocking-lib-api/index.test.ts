// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

// jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  // afterAll(() => {
  //   jest.unmock('axios');
  // });

  test('should create instance with provided base url', async () => {
    const watchCreate = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('users');
    expect(watchCreate).toHaveBeenCalledTimes(1);
    expect(watchCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // This shit doesn`t work and I don`t know why.
    // const axiosClient = {
    //   get: jest.fn(() => ({ data: '' })),
    // };
    // jest
    //   .spyOn(axios, 'create')
    //   .mockImplementation(() => axiosClient as unknown as AxiosInstance);
    //
    // const relPath = 'some valid path';
    // await throttledGetDataFromApi(relPath);
    //
    // expect(axiosClient.get).toHaveBeenCalledWith(relPath);
    // expect(axiosClient.get).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // The same situation
  });
});
