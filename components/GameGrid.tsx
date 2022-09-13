import { Flex } from "@chakra-ui/react";

export interface GameGridProps {
  grid: number[][];
}
const GameGrid: React.FC<GameGridProps> = () => {
  // jkdf
  return <Flex justifyContent="center"></Flex>;
};

export default GameGrid;
