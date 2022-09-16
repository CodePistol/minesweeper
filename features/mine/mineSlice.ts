import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { dirs } from "../../utils/constants";
import {
  ICell,
  IMineState,
  ISetupMine,
  IMineParams,
  ICellCoordinates,
} from "./interface";
import { makeGrid } from "../../utils/getGrid";

const initialState: IMineState = {
  grid: null,
  height: null,
  width: null,
  numOfBombs: null,
  gameOver: false,
  unmaskedArray: null,
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
      state.unmaskedArray = new Array(payload.height).fill(
        new Array(payload.width).fill(false)
      ) as boolean[][];
    },
    invertMask: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
      if (state.grid) {
        state.grid[r][c].isMasked = !state.grid[r][c].isMasked;
      }
    },
    clearMine: (state, { payload }: PayloadAction<ICellCoordinates>) => {
      const { r, c } = payload;
    },
  },
});

export const { setupMine, invertMask, clearMine } = mineSlice.actions;
export default mineSlice.reducer;
