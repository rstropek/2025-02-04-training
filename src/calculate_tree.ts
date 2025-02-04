
import { degreeToRadian } from "./math_helpers";

export interface Point {
  x: number;
  y: number;
}

export interface Branch {
  start: Point;
  end: Point;
}

export interface TreeParams {
  x1: number;
  y1: number;
  angle: number;
  length: number;
  level: number;
  maxLevel?: number;
}

function calculateBranchEndpoint(start: Point, angle: number, length: number): Point {
  const rad = degreeToRadian(angle);
  return {
    x: start.x + length * Math.cos(rad),
    y: start.y + length * Math.sin(rad)
  };
}

export function calculateTree(params: TreeParams): Branch[] {
  const { x1, y1, angle, length, level, maxLevel = 11 } = params;
  if (level >= maxLevel) { return []; }

  const start: Point = { x: x1, y: y1 };
  const end = calculateBranchEndpoint(start, angle, length);
  const currentBranch: Branch = { start, end };

  return [
    currentBranch,
    ...calculateTree({
      x1: end.x,
      y1: end.y,
      angle: angle - 20,
      length: length * 0.8,
      level: level + 1,
      maxLevel
    }),
    ...calculateTree({
      x1: end.x,
      y1: end.y,
      angle: angle + 20,
      length: length * 0.8,
      level: level + 1,
      maxLevel
    })
  ];
}