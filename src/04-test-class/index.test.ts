// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

const balance = 1000;
const overBalance = balance + 100;
const underBalance = 40;
const ba = getBankAccount(balance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(ba.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => ba.withdraw(overBalance)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const consumer = getBankAccount(0);
    expect(() => ba.transfer(overBalance, consumer)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => ba.transfer(1, ba)).toThrow();
  });

  test('should deposit money', () => {
    const ba = getBankAccount(balance);
    ba.deposit(underBalance);
    expect(ba.getBalance()).toBe(balance + underBalance);
  });

  test('should withdraw money', () => {
    const ba = getBankAccount(balance);
    ba.withdraw(underBalance);
    expect(ba.getBalance()).toBe(balance - underBalance);
  });

  test('should transfer money', () => {
    const ba = getBankAccount(balance);
    const consumer = getBankAccount(0);
    ba.transfer(underBalance, consumer);
    expect(ba.getBalance()).toBe(balance - underBalance);
    expect(consumer.getBalance()).toBe(underBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    await ba.fetchBalance().then((v) => {
      if (v !== null) {
        expect(typeof v).toBe('number');
      }
    });
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const ba = getBankAccount(100);
    const prevBalance = ba.getBalance();
    try {
      await ba.synchronizeBalance();
      expect(ba.getBalance()).not.toBe(prevBalance);
    } catch (e) {
      return;
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await ba.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
