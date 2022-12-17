import { Flex } from "@chakra-ui/react";
import Cell from "./Cell";
import { useAppSelector } from "../app/hooks";
import { gridSelector } from "../selectors/mineSelector";

const GameGrid: React.FC = () => {
  const grid = useAppSelector(gridSelector);
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
