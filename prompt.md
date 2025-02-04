Currently, calculating my tree happens in #file:calculate_tree.ts . In #file:index.ts , I create SVG from the previously calculated tree points. I do not like this structure. I would like to simplify my program. Integrate the calculation logic into #file:index.ts so that calculation and SVG building happens in one go.

