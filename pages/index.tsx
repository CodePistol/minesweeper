import type { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import { setupMine } from "../features/mine/mineSlice";
import { useAppDispatch } from "../app/hooks";
import { useEffect } from "react";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setupMine({ height: 8, width: 8, numOfBombs: 10 }));
  }, []);
  return (
    <Flex alignItems="center" direction="column">
      <Text textStyle="p1" color="black.400">
        Hello Minesweeper!
      </Text>
      <GameGrid />
    </Flex>
  );
};

export default Home;
