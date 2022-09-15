import { Box, Text } from "@chakra-ui/react";

export interface CellProps {
  value: number;
  isMasked: boolean;
  isBomb: boolean;
}
const numberColors: { [key: string]: string } = {
  "1": "blue",
  "2": "green",
  "3": "red",
  "4": "yellow",
  "5": "purple",
  "-1": "red",
};
const Cell: React.FC<CellProps> = (props) => {
  return (
    <>
      <Box
        m="2px"
        display="flex"
        w={8}
        h={8}
        background="gray.200"
        border="1px solid"
        alignContent="center"
        justifyContent="center"
      >
        <Text textStyle="p2" color={numberColors[props.value.toString()]}>
          {props.value}
        </Text>
      </Box>
    </>
  );
};

export default Cell;
