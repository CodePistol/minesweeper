import type { RootState } from "../app/store";

export const gridSelector = (state: RootState) => state.mine.grid;
