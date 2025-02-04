import { calculateTree, calculateBranchEndpoint, type Branch, type Point } from './calculate_tree';

describe('calculateTree', () => {
  it('should generate branches with correct structure', () => {
    const branches = calculateTree({
      x1: 0,
      y1: 0,
      angle: 90,
      length: 100,
      level: 0,
      maxLevel: 2,
      currentColor: { r: 0, g: 0, b: 0 },
      thickness: 10
    });

    expect(branches.length).toBeGreaterThan(0);
    const branch = branches[branches.length - 1];
    expect(branch).toHaveProperty('start');
    expect(branch).toHaveProperty('end');
    expect(branch).toHaveProperty('color');
    expect(branch).toHaveProperty('thickness');
  });

  it('should respect maxLevel parameter', () => {
    const branches = calculateTree({
      x1: 0,
      y1: 0,
      angle: 90,
      length: 100,
      level: 0,
      maxLevel: 2,
      currentColor: { r: 0, g: 0, b: 0 },
      thickness: 10
    });

    expect(branches.length).toBe(3); // One parent branch and two children
  });

  it('should increase green color component', () => {
    const branches = calculateTree({
      x1: 0,
      y1: 0,
      angle: 90,
      length: 100,
      level: 0,
      maxLevel: 2,
      currentColor: { r: 50, g: 50, b: 50 },
      thickness: 10
    });

    const colors = branches.map(b => b.color);
    const lastColor = colors[colors.length - 1];
    const higherColor = colors[0];
    
    expect(higherColor).toMatch(/rgb\(50,\s*65,\s*50\)/);
    expect(lastColor).toMatch(/rgb\(50,\s*50,\s*50\)/);
  });

  it('should reduce thickness with each level', () => {
    const branches = calculateTree({
      x1: 0,
      y1: 0,
      angle: 90,
      length: 100,
      level: 0,
      maxLevel: 2,
      currentColor: { r: 0, g: 0, b: 0 },
      thickness: 10
    });

    const parentBranch = branches[branches.length - 1];
    const childBranch = branches[0];
    
    expect(childBranch.thickness).toBeLessThan(parentBranch.thickness);
    expect(childBranch.thickness).toBeCloseTo(parentBranch.thickness * 0.8);
  });
});

describe('calculateBranchEndpoint', () => {
  const start: Point = { x: 0, y: 0 };
  const length = 10;

  test('calculates endpoint for 0 degrees (right)', () => {
    const result = calculateBranchEndpoint(start, 0, length);
    expect(result.x).toBeCloseTo(10);
    expect(result.y).toBeCloseTo(0);
  });

  test('calculates endpoint for 90 degrees (up)', () => {
    const result = calculateBranchEndpoint(start, 90, length);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(10);
  });

  test('calculates endpoint for 180 degrees (left)', () => {
    const result = calculateBranchEndpoint(start, 180, length);
    expect(result.x).toBeCloseTo(-10);
    expect(result.y).toBeCloseTo(0);
  });

  test('calculates endpoint for 270 degrees (down)', () => {
    const result = calculateBranchEndpoint(start, 270, length);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(-10);
  });

  test('calculates endpoint for 45 degrees (up-right)', () => {
    const result = calculateBranchEndpoint(start, 45, length);
    const expected = 10 * Math.sqrt(2) / 2; // ≈ 7.07
    expect(result.x).toBeCloseTo(expected);
    expect(result.y).toBeCloseTo(expected);
  });

  it('should calculate correct endpoint', () => {
    const start: Point = { x: 0, y: 0 };
    const end = calculateBranchEndpoint(start, 90, 100);
    
    expect(end.x).toBeCloseTo(0);
    expect(end.y).toBeCloseTo(100);
  });
});
