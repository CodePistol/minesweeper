export interface ICell {
  value: number;
  isMasked: boolean;
}

export interface IMineParams {
  height: number;
  width: number;
  numOfBombs: number;
}

export interface IMineState {
  grid: ICell[][] | null;
  height: number | null;
  width: number | null;
  numOfBombs: number | null;
}

export interface ISetupMine {
  height: number;
  width: number;
  numOfBombs: number;
}
