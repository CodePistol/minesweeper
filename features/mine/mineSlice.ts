import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

import { ICell, IMineState, ISetupMine, IMineParams } from "./interface";

const initialState: IMineState = {
  grid: null,
  height: null,
  width: null,
  numOfBombs: null,
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    setupMine: (state, { payload }: PayloadAction<ISetupMine>) => {
      state.height = payload.height;
      state.width = payload.width;
      state.numOfBombs = payload.numOfBombs;
      state.grid = makeGrid({
        height: state.height,
        width: state.width,
        numOfBombs: state.numOfBombs,
      });
    },
  },
});

export const { setupMine } = mineSlice.actions;
export default mineSlice.reducer;

const makeGrid = ({ height, width, numOfBombs }: IMineParams) => {
  if (height * width <= numOfBombs) {
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
  const result: ICell[][] = [[]];
  for (var i = 0; i < height * width; i++) {
    if (Math.floor(i / width) >= result.length) {
      result.push([]);
    }
    result[Math.floor(i / width)].push({
      value: 0,
      isMasked: false,
    });
  }
  for (var i = 0; i < numOfBombs; i++) {
    result[Math.floor(grid[i] / width)][grid[i] % width].value = -1;
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
      if (result[i][j].value == -1) {
        dirs.forEach(([a, b]) => {
          const r = i + a;
          const c = j + b;
          if (
            r >= 0 &&
            r < height &&
            c >= 0 &&
            c < width &&
            result[r][c].value != -1
          ) {
            result[r][c].value += 1;
          }
        });
      }
    }
  }
  return result;
};
