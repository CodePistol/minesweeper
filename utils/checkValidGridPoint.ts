export const isPointValid = (
  row: number,
  column: number,
  height: number,
  width: number
) => {
  return row >= 0 && row < height && column >= 0 && column < width;
};
