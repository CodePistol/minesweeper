import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IMineState, ISetupMine, ICellCoordinates } from "./interface";
import { makeGrid } from "../../utils/getGrid";
import Queue from "../../utils/Queue";
import { isPointValid } from "../../utils/checkValidGridPoint";
import { dirs, dirsTraversal } from "../../utils/constants";

const initialState: IMineState = {
  grid: [],
  height: 0,
  width: 0,
  numOfBombs: 0,
  gameOver: false,
  unmaskedArray: [],
  numberOfFlags: 0,
  gameWon: false,
};

export const mineSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    setupMine: (state, { payload }: PayloadAction<ISetupMine>) => {
      state.height = payload.height;
      state.width = payload.width;
      state.numOfBombs = payload.numOfBombs;
      state.numberOfFlags = 0;
      state.gameOver = false;
      state.grid = makeGrid({
        height: state.height,
        width: state.width,
        numOfBombs: state.numOfBombs,
      });
      state.unmaskedArray = new Array(payload.height).fill(
        new Array(payload.width).fill(false)
      ) as boolean[][];
    },
    unmaskCell: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
      if (state.grid) {
        state.grid[r][c].isMasked = false;
      }
    },
    flagCell: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
      if (isPointValid(r, c, state.height, state.width)) {
        state.grid[r][c].isFlagged = true;
        state.numberOfFlags++;
      }
    },
    unFlagCell: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
      if (isPointValid(r, c, state.height, state.width)) {
        state.grid[r][c].isFlagged = false;
        state.numberOfFlags--;
      }
    },
    unmaskGrid: (state) => {
      for (let i = 0; i < state.height; i++) {
        for (let j = 0; j < state.width; j++) {
          state.grid[i][j].isMasked = false;
        }
      }
    },
    setGameOver: (state) => {
      state.gameOver = true;
    },
    setGameWon: (state) => {
      state.gameWon = true;
    },
    clearMine: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
      const queue = new Queue<[number, number]>();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const visited = [...Array(state.height)].map((x) =>
        Array(state.width).fill(0)
      );
      queue.enqueue([r, c]);
      visited[r][c] = 1;

      while (queue.getLength() > 0) {
        const dequeuedItem = queue.deque();
        if (!dequeuedItem) return;
        const [i, j] = dequeuedItem;
        visited[i][j] = 1;
        if (state.grid) {
          state.grid[i][j].isMasked = false;
        }
        dirsTraversal.forEach((dir) => {
          const row = i + dir[0];
          const col = j + dir[1];

          if (
            state.height &&
            state.width &&
            isPointValid(row, col, state.height, state.width) &&
            !visited[row][col] &&
            state.grid &&
            state.grid[row][col].value === 0
          ) {
            queue.enqueue([row, col]);
            visited[row][col] = 1;
          }
        });
      }
      const morePointsToBeVisited: [number, number][] = [];

      for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[0].length; j++) {
          if (visited[i][j] === 1) {
            dirs.forEach((dir) => {
              const row = dir[0] + i;
              const col = dir[1] + j;

              if (
                isPointValid(row, col, visited.length, visited[0].length) &&
                !visited[row][col]
              ) {
                if (state.grid) {
                  morePointsToBeVisited.push([row, col]);
                }
              }
            });
          }
        }
      }
      morePointsToBeVisited.forEach((point) => {
        if (state.grid) {
          state.grid[point[0]][point[1]].isMasked = false;
        }
      });
    },
  },
});

export const {
  setupMine,
  unmaskCell,
  clearMine,
  flagCell,
  unFlagCell,
  unmaskGrid,
  setGameWon,
  setGameOver,
} = mineSlice.actions;
export default mineSlice.reducer;
