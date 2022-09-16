import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { clearMine, invertMask } from "../features/mine/mineSlice";
import { ICell } from "../features/mine/interface";

const numberColors: { [key: string]: string } = {
  "1": "blue",
  "2": "green",
  "3": "red",
  "4": "yellow",
  "5": "purple",
  "-1": "red",
};
const Cell: React.FC<ICell> = (props) => {
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (props.isMasked) {
      dispatch(invertMask({ r: props.r, c: props.c }));
      if (props.value === 0) {
        dispatch(clearMine({ r: props.r, c: props.c }));
      }
    }
  };
  return (
    <Flex m={1} position="relative" onClick={handleClick}>
      <Flex
        w={8}
        h={8}
        background="gray.200"
        border="1px solid"
        alignItems="center"
        justifyContent="center"
        top={0}
        left={0}
      >
        <Text textStyle="p2" color={numberColors[props.value.toString()]}>
          {props.value}
        </Text>
      </Flex>
      <Flex
        w={8}
        h={8}
        position="absolute"
        top={0}
        left={0}
        background="gray.900"
        opacity={0.5}
        zIndex={props.isMasked ? 10 : -1}
      />
    </Flex>
  );
};

export default Cell;
