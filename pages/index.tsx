import type { NextPage } from "next";
import { Button, Flex, Text } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import {
  flagCell,
  setupMine,
  unFlagCell,
  unmaskGrid,
} from "../features/mine/mineSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useRef } from "react";
import { mineSelector } from "../selectors/mineSelector";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const mine = useAppSelector(mineSelector);
  const mineRef = useRef(mine);

  const cellOnRightClick = (row: number, col: number) => {
    if (mineRef.current.gameOver) return;
    if (mineRef.current.grid[row][col].isFlagged) {
      dispatch(unFlagCell({ r: row, c: col }));
    } else if (
      mineRef.current.grid[row][col].isMasked &&
      mineRef.current.numberOfFlags < mineRef.current.numOfBombs &&
      !mineRef.current.grid[row][col].isFlagged
    ) {
      dispatch(flagCell({ r: row, c: col }));
    }
  };

  useEffect(() => {
    if (mine.gameWon) {
      dispatch(unmaskGrid());
    }
  }, [mine.gameWon]);

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

  const gotoRules = () => {
    // push("/rules");
  };

  return (
    <Flex alignItems="center" direction="column">
      <Text textStyle="p1" color="black.400">
        Hello Minesweeper!
      </Text>
      <Flex alignItems="center" gap="10px">
        <Button onClick={setupMineFunc}>
          {mine.gameOver
            ? "Well played! Click to reset mine"
            : mine.gameWon
            ? "Good Game! Click to reset mine"
            : "Reset Mine"}
        </Button>
        <Text as="u" onClick={gotoRules} _hover={{ cursor: "pointer" }}>
          <a href="/rules" target="_blank">
            Rules
          </a>
        </Text>
      </Flex>
      <Flex direction="column">
        <Flex w="100%" justifyContent="center">
          You have {mine.numOfBombs - mine.numberOfFlags} flags remaining
        </Flex>
        <GameGrid />
      </Flex>
    </Flex>
  );
};

export default Home;
