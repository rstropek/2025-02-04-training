import { degreeToRadian } from './math_helpers';

describe('degreeToRadian', () => {
  test('converts 0 degrees to 0 radians', () => {
    expect(degreeToRadian(0)).toBe(0);
  });

  test('converts 90 degrees to PI/2 radians', () => {
    expect(degreeToRadian(90)).toBeCloseTo(Math.PI / 2);
  });

  test('converts 180 degrees to PI radians', () => {
    expect(degreeToRadian(180)).toBeCloseTo(Math.PI);
  });

  test('converts 270 degrees to 3PI/2 radians', () => {
    expect(degreeToRadian(270)).toBeCloseTo(3 * Math.PI / 2);
  });

  test('converts 360 degrees to 2PI radians', () => {
    expect(degreeToRadian(360)).toBeCloseTo(2 * Math.PI);
  });
});
