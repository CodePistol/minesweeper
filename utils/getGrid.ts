export interface getGridProps {
  height: number;
  width: number;
  numberOfBombs: number;
}

export const getGrid = ({ height, width, numberOfBombs }: getGridProps) => {
  if (height * width <= numberOfBombs) {
    return null;
  }
  const grid = [];
  for (var i = 0; i < height * width; i++) {
    grid.push(i);
  }
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  const result: number[][] = [[]];
  for (var i = 0; i < height * width; i++) {
    if (Math.floor(i / width) >= result.length) {
      result.push([]);
    }
    result[Math.floor(i / width)].push(0);
  }
  for (var i = 0; i < numberOfBombs; i++) {
    result[Math.floor(grid[i] / width)][grid[i] % width] = -1;
  }

  //At this point we have an array of 0 and 1 valules
  //with 1 denoting the presence of a bomb. Now, let's
  // populate the grid with 1, 2, 3, 4...
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [-1, 0],
  ];
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (result[i][j] == -1) {
        dirs.forEach(([a, b]) => {
          const r = i + a;
          const c = j + b;
          if (
            r >= 0 &&
            r < height &&
            c >= 0 &&
            c < width &&
            result[r][c] != -1
          ) {
            result[r][c] += 1;
          }
        });
      }
    }
  }

  return result;
};
