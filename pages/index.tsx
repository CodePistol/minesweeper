import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const { push } = useRouter();
  return (
    <Flex justifyContent="center">
      <Text textStyle="p1" color="black.400">
        Hello Minesweeper!
      </Text>
    </Flex>
  );
};

export default Home;
