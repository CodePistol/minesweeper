import { Flex } from "@chakra-ui/react";
import Cell from "./Cell";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { gridSelector, mineSelector } from "../selectors/mineSelector";
import { useEffect } from "react";
import { setGameWon } from "../features/mine/mineSlice";

const GameGrid: React.FC = () => {
  const grid = useAppSelector(gridSelector);
  const mine = useAppSelector(mineSelector);
  const dispatch = useAppDispatch();

  const checkGameWon = () => {
    let flaggedBombs = 0;
    let unmaskedCells = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (!grid[i][j].isMasked) {
          unmaskedCells++;
        }
        if (grid[i][j].value === -1 && grid[i][j].isFlagged) {
          flaggedBombs++;
        }
      }
    }
    if (
      mine.grid.length > 0 &&
      unmaskedCells === mine.height * mine.width - mine.numOfBombs &&
      flaggedBombs === mine.numOfBombs
    ) {
      dispatch(setGameWon());
      setTimeout(() => {
        alert("You win! Yaay!");
      }, 0);
    }
  };

  useEffect(() => {
    checkGameWon();
  }, [grid]);

  return (
    grid && (
      <Flex justifyContent="center" direction="column">
        {grid.map((row, r) => {
          return (
            <Flex direction="row" key={r}>
              {row.map((cell, c) => (
                <Cell
                  value={cell.value}
                  isMasked={cell.isMasked}
                  isFlagged={cell.isFlagged}
                  r={r}
                  c={c}
                  key={c}
                />
              ))}
            </Flex>
          );
        })}
      </Flex>
    )
  );
};

export default GameGrid;
