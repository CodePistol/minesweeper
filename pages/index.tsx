import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";
import { getGrid } from "../utils/getGrid";
import GameGrid from "../components/GameGrid";

const Home: NextPage = () => {
  const { push } = useRouter();
  const grid = getGrid({
    height: 8,
    width: 8,
    numberOfBombs: 10,
  }) || [[0]];
  console.log(grid);
  return (
    <Flex justifyContent="center">
      <Text textStyle="p1" color="black.400">
        Hello Minesweeper!
      </Text>
      <GameGrid grid={grid} />
    </Flex>
  );
};

export default Home;
