import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";
import GameGrid from "../components/GameGrid";
import { setupMine } from "../features/mine/mineSlice";
import { useAppDispatch } from "../app/hooks";

const Home: NextPage = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  dispatch(setupMine({ height: 8, width: 8, numOfBombs: 10 }));
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
