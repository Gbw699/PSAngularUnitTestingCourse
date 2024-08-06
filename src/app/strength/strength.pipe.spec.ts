import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  it('Should display (weak) if value is lesser than 10', () => {
    let pipe = new StrengthPipe();

    let result = pipe.transform(5);

    expect(result).toBe('5 (weak)');
  });

  it('Should display (strong) if value is greater or equal to 10 and lesser than 20', () => {
    let pipe = new StrengthPipe();

    let result = pipe.transform(15);

    expect(result).toBe('15 (strong)');
  });

  it('Should display (unbelievable) if value is greater than 20', () => {
    let pipe = new StrengthPipe();

    let result = pipe.transform(31);

    expect(result).toBe('31 (unbelievable)');
  });
});
