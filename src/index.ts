import express from "express";
import { calculateFractalTree, LinePoint } from "./calculate_tree";

const app = express();
const port = 3000;

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

function linePointToSVG(point: LinePoint): string {
  return `<line x1="${point.x1}" y1="${point.y1}" x2="${point.x2}" y2="${point.y2}" stroke="black" />`;
}

function generateFractalTree(): string {
  const points = calculateFractalTree({
    x1: 400,
    y1: 500,
    angle: -90,
    length: 100,
    level: 0,
  });

  const lines = points.map(linePointToSVG).join("");
  return `<svg width="800" height="800">${lines}</svg>`;
}

app.get("/", (req, res) => {
  const svg = generateFractalTree();
  res.send(generateHtml(svg));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
