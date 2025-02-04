import express from "express";
import { degreeToRadian } from "./math_helpers";

const app = express();
const port = 3000;

type LinePoint = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

function calculateBranchPoints(x1: number, y1: number, angle: number, length: number): LinePoint {
  const rad = degreeToRadian(angle);
  const x2 = x1 + length * Math.cos(rad);
  const y2 = y1 + length * Math.sin(rad);
  return { x1, y1, x2, y2 };
}

type TreeParams = {
  x1: number;
  y1: number;
  angle: number;
  length: number;
  level: number;
  maxLevel?: number;
};

function generateFractalTree(params: TreeParams): string {
  const { x1, y1, angle, length, level, maxLevel = 11 } = params;
  if (level >= maxLevel) { return ""; }

  const currentBranch = calculateBranchPoints(x1, y1, angle, length);
  const line = `<line x1="${currentBranch.x1}" y1="${currentBranch.y1}" x2="${currentBranch.x2}" y2="${currentBranch.y2}" stroke="black" />`;

  const leftBranches = generateFractalTree({
    x1: currentBranch.x2,
    y1: currentBranch.y2,
    angle: angle - 20,
    length: length * 0.8,
    level: level + 1,
    maxLevel
  });
  const rightBranches = generateFractalTree({
    x1: currentBranch.x2,
    y1: currentBranch.y2,
    angle: angle + 20,
    length: length * 0.8,
    level: level + 1,
    maxLevel
  });

  return line + leftBranches + rightBranches;
}

function generateHtml(svg: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fractal Tree</title>
    </head>
    <body>
        ${svg}
    </body>
    </html>`;
}

app.get("/", (req, res) => {
  const svg = `<svg width="800" height="800">${generateFractalTree({
    x1: 400,
    y1: 500,
    angle: -90,
    length: 100,
    level: 0,
  })}</svg>`;
  res.send(generateHtml(svg));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
