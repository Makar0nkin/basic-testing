// Uncomment the code below and write your tests
import { mockOne,mockTwo, mockThree, unmockedFunction } from './index';

// let moked: jest.Mocked<typeof mockOne>;
jest.mock('./index', () => ({
  ...jest.requireActual('./index'),
  mockOne: jest.fn(() => mockOne()),
  mockTwo: jest.fn(() => mockTwo()),
  mockThree: jest.fn(() => mockThree()),
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // const mocked1 = jest.fn(mockOne);
    mockOne();
    mockTwo();
    mockThree();
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
  });
});
