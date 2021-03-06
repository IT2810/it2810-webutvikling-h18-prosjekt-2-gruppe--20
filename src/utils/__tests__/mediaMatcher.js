import { chosenAlternativesToNumber, getFileNames } from '../mediaMatcher';

describe('chosenAlternativesToNumber', () => {
  it('should return 10 on 2,3 as input', () => {
    const number = chosenAlternativesToNumber(1, 2);
    expect(number).toBe(10);
  });
  it('should return 12 on 4,3 as input', () => {
    const number = chosenAlternativesToNumber(3, 2);
    expect(number).toBe(12);
  });
  it('should return 1 on 1,1 as input', () => {
    const number = chosenAlternativesToNumber(0, 0);
    expect(number).toBe(1);
  });
  it('should throw error on non numeric inputs', () => {
    expect(() => chosenAlternativesToNumber('1', 2)).toThrow(Error);
  });
  it('should throw error on non numeric inputs', () => {
    expect(() => chosenAlternativesToNumber(1, [])).toThrow(Error);
  });
});

describe('getFileNames', () => {
  it('should return object with correct filenames', () => {
    const returnedObject = getFileNames(1, 0, 1, 2);
    expect(returnedObject).toEqual({
      img: 'img2.svg',
      aud: 'aud6.mp3',
      txt: 9,
    });
  });
  it('should return object with correct filenames', () => {
    const returnedObject = getFileNames(3, 0, 1, 2);
    expect(returnedObject).toEqual({
      img: 'img4.svg',
      aud: 'aud8.mp3',
      txt: 11,
    });
  });
});
