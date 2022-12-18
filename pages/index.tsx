import type { NextPage } from "next";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import { flagCell, setupMine } from "../features/mine/mineSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useRef } from "react";
import { mineSelector } from "../selectors/mineSelector";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const mine = useAppSelector(mineSelector);
  const mineRef = useRef(mine);

  const cellOnRightClick = (row: number, col: number) => {
    if (mineRef.current.gameOver) return;
    if (
      mineRef.current.grid[row][col].isMasked &&
      mineRef.current.numberOfFlags <= mineRef.current.numOfBombs &&
      !mineRef.current.grid[row][col].isFlagged
    ) {
      dispatch(flagCell({ r: row, c: col }));
    }
  };

  useEffect(() => {
    mineRef.current = mine;
  }, [mine]);

  useEffect(() => {
    setupMineFunc();
    window.addEventListener(
      "contextmenu",
      (event) => {
        const targetElement = event.target as HTMLDivElement;
        if (
          targetElement.id &&
          targetElement.id.startsWith("cell_") &&
          targetElement.id.split("_").length === 3
        ) {
          const id = targetElement.id.split("_");
          const row = Number(id[1]);
          const col = Number(id[2]);
          cellOnRightClick(row, col);
          event.preventDefault();
        }
      },
      true
    );
  }, []);

  const setupMineFunc = () => {
    const height = 8;
    const width = 8;
    const numOfBombs = 10;
    if (height * width < numOfBombs) return;
    dispatch(
      setupMine({ height: height, width: width, numOfBombs: numOfBombs })
    );
  };

  return (
    <Flex alignItems="center" direction="column">
      <Text textStyle="p1" color="black.400">
        Hello Minesweeper!
      </Text>
      <Button onClick={setupMineFunc}>Reset Mine</Button>
      <Flex direction="column">
        <Box>
          You have {mine.numOfBombs - mine.numberOfFlags} flags remaining
        </Box>
        <GameGrid />
      </Flex>
    </Flex>
  );
};

export default Home;
