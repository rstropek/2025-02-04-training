import express from "express";
import { calculateTree, Branch, TreeParams } from "./calculate_tree";

const app = express();
const port = 3000;

function branchToSvgLine(branch: Branch): string {
  return `<line x1="${branch.start.x}" y1="${branch.start.y}" x2="${branch.end.x}" y2="${branch.end.y}" stroke="black" />`;
}

function generateSvgTree(params: TreeParams): string {
  const branches = calculateTree(params);
  return branches.map(branchToSvgLine).join("");
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
  const svg = `<svg width="800" height="800">${generateSvgTree({
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
