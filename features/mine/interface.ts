export interface ICell {
  value: number;
  isMasked: boolean;
  isFlagged: boolean;
  r: number;
  c: number;
}

export interface IMineParams {
  height: number;
  width: number;
  numOfBombs: number;
}

export interface IMineState {
  grid: ICell[][];
  height: number;
  width: number;
  numOfBombs: number;
  gameOver: boolean;
  unmaskedArray: boolean[][];
  numberOfFlags: number;
  gameWon: boolean;
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
