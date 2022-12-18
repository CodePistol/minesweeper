import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearMine,
  setGameOver,
  unmaskCell,
  unmaskGrid,
} from "../features/mine/mineSlice";
import { ICell } from "../features/mine/interface";
import { mineSelector } from "../selectors/mineSelector";
import { dirs } from "../utils/constants";
import { isPointValid } from "../utils/checkValidGridPoint";

const numberColors: { [key: string]: string } = {
  "1": "blue",
  "2": "green",
  "3": "red",
  "4": "yellow",
  "5": "purple",
  "-1": "red",
};
const Cell: React.FC<ICell> = (props) => {
  const mine = useAppSelector(mineSelector);
  const dispatch = useAppDispatch();

  const gameOver = () => {
    dispatch(unmaskGrid());
    dispatch(setGameOver());
    setTimeout(() => {
      alert("Game Over!");
    }, 0);
  };

  const funct = () => {
    let noOfFlagsAround = 0;
    let noOfCorrectlyPlacedFlags = 0;
    dirs.forEach((dir) => {
      const r = props.r + dir[0];
      const c = props.c + dir[1];
      if (isPointValid(r, c, mine.height, mine.width)) {
        if (mine.grid[r][c].isFlagged) {
          noOfFlagsAround++;
          if (mine.grid[r][c].value === -1) {
            noOfCorrectlyPlacedFlags++;
          }
        }
      }
    });
    if (
      noOfFlagsAround === noOfCorrectlyPlacedFlags &&
      noOfFlagsAround === props.value
    ) {
      dirs.forEach((dir) => {
        const r = props.r + dir[0];
        const c = props.c + dir[1];
        if (
          isPointValid(r, c, mine.height, mine.width) &&
          !mine.grid[r][c].isFlagged
        ) {
          dispatch(unmaskCell({ r: r, c: c }));
          if (mine.grid[r][c].value === 0) {
            dispatch(clearMine({ r: r, c: c }));
          }
        }
      });
    } else if (noOfFlagsAround === props.value) {
      gameOver();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mine.gameOver) return;
    event.stopPropagation();
    if (props.isFlagged) return;
    if (props.isMasked) {
      if (props.value === -1) {
        gameOver();
      } else {
        dispatch(unmaskCell({ r: props.r, c: props.c }));
        if (props.value === 0 && props.isMasked) {
          dispatch(clearMine({ r: props.r, c: props.c }));
        }
      }
    } else {
      funct();
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
        background={props.isFlagged ? "red" : "gray.900"}
        // opacity={0.5}
        zIndex={props.isMasked ? 10 : -1}
        id={`cell_${props.r}_${props.c}`}
      ></Flex>
    </Flex>
  );
};

export default Cell;
