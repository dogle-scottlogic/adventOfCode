// https://adventofcode.com/2023/day/2

import * as fs from "fs";

function readData(): string[] {
  const words = fs.readFileSync("data/2-1.txt", "utf-8");
  return words.split("\r\n");
}

interface Cubes {
  red: number;
  green: number;
  blue: number;
}

export function dayTwoPartOne() {
  let result = 0;
  const bagContents: Cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const games = readData().map((line) => line.split(":")[1].trim());

  const isGamePossible = (game: string): boolean => {
    const sets = game.split(";");

    return sets.reduce((acc, set) => {
      const cubes = set.split(",");
      const setCount: Cubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      cubes.forEach((cube) => {
        const cubeParts = cube.trim().split(" ");
        setCount[cubeParts[1] as keyof Cubes] += Number(cubeParts[0]);
      });
      return (
        acc &&
        setCount.blue <= bagContents.blue &&
        setCount.green <= bagContents.green &&
        setCount.red <= bagContents.red
      );
    }, true);
  };

  games.forEach((g, i) => {
    const gamePossible = isGamePossible(g);
    if (gamePossible) {
      result += i + 1;
    }
  });
  console.log(result);
}

export function dayTwoPartTwo() {
  let result = 0;
  const games = readData().map((line) => line.split(":")[1].trim());

  const findMinCubes = (game: string): Cubes => {
    const minSet: Cubes = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const sets = game.split(";");
    sets.forEach((set) => {
      const cubes = set.split(",");
      cubes.forEach((cube) => {
        const cubeParts = cube.trim().split(" ");
        const currentCount = minSet[cubeParts[1] as keyof Cubes];
        if (Number(cubeParts[0]) > currentCount) {
          minSet[cubeParts[1] as keyof Cubes] = Number(cubeParts[0]);
        }
      });
    });
    return minSet;
  };

  games.forEach((g) => {
    const minCubes = findMinCubes(g);
    const power = minCubes.blue * minCubes.green * minCubes.red;
    result += power;
  });
  console.log(result);
}
