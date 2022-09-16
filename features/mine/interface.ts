export interface ICell {
  value: number;
  isMasked: boolean;
  r: number;
  c: number;
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
  gameOver: boolean;
  unmaskedArray: boolean[][] | null;
}

export interface ISetupMine {
  height: number;
  width: number;
  numOfBombs: number;
}

export interface ICellCoordinates {
  r: number;
  c: number;
}
