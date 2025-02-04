import { degreeToRadian } from "./math_helpers";

export type LinePoint = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export function calculateBranchPoints(x1: number, y1: number, angle: number, length: number): LinePoint {
    const rad = degreeToRadian(angle);
    const x2 = x1 + length * Math.cos(rad);
    const y2 = y1 + length * Math.sin(rad);
    return { x1, y1, x2, y2 };
}

export type TreeParams = {
    x1: number;
    y1: number;
    angle: number;
    length: number;
    level: number;
    maxLevel?: number;
}

export function calculateFractalTree(params: TreeParams): LinePoint[] {
    const { x1, y1, angle, length, level, maxLevel = 11 } = params;
    if (level >= maxLevel) { return []; }

    const currentBranch = calculateBranchPoints(x1, y1, angle, length);
    const points: LinePoint[] = [currentBranch];

    const leftBranches = calculateFractalTree({
        x1: currentBranch.x2,
        y1: currentBranch.y2,
        angle: angle - 20,
        length: length * 0.8,
        level: level + 1,
        maxLevel
    });
    const rightBranches = calculateFractalTree({
        x1: currentBranch.x2,
        y1: currentBranch.y2,
        angle: angle + 20,
        length: length * 0.8,
        level: level + 1,
        maxLevel
    });

    return [...points, ...leftBranches, ...rightBranches];
}