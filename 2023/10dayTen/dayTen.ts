// https://adventofcode.com/2023/day/10

import * as fs from "fs";

type MapValue = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
type Map = MapValue[][];
type Coords = number[];

const getBoundaryCoords = (currentCoords: Coords, map: Map) => {
  const row = currentCoords[0];
  const col = currentCoords[1];
  const mapping: { [key: string]: number[] } = {
    n: [row - 1, col], // t
    e: [row, col + 1], // r
    s: [row + 1, col], // b
    w: [row, col - 1], // l
  };
  Object.keys(mapping).forEach((key) =>
    map[mapping[key][0]] === undefined ||
    map[mapping[key][0]][mapping[key][1]] === undefined
      ? delete mapping[key]
      : {}
  );
  return mapping;
};

function readData() {
  const words = fs.readFileSync("data/10-1.txt", "utf-8");
  return words.split("\r\n");
}

function parseData(data: string[]): { map: Map; start: Coords } {
  const map = data.map((row) => Array.from(row) as MapValue[]);
  let start: Coords = [];
  map.forEach((row, i) => {
    const sCol = row.indexOf("S");
    if (sCol !== -1) {
      start = [i, sCol];
      return;
    }
  });
  return { map, start };
}

export function dayTenPartOne() {
  const data = readData();
  const { map, start } = parseData(data);
  //   console.log(map);
  //   console.log(start);
  const s = findS(start, map);
  const count = tracePath(start, map, s);
  console.log(count / 2);
}

export function dayTenPartTwo() {
  const data = readData();
  const { map, start } = parseData(data);
  const s = findS(start, map);
  const mapCoords = documentPath(start, map, s);
  let count = 0;
  let innerLoop = false;
  let lastLoopValue: MapValue = ".";
  // itterate the map
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
      const cellValue =
        map[rowIndex][colIndex] === "S" ? s : map[rowIndex][colIndex];
      const key = `${rowIndex}:${colIndex}`;
      if (mapCoords[key] != null) {
        innerLoop = isInnerLoop(cellValue, lastLoopValue, innerLoop);
      }

      if (innerLoop && mapCoords[key] == null) {
        count++;
      }
      lastLoopValue = cellValue === "-" ? lastLoopValue : cellValue;
    }
  }
  console.log("Count: ", count);
}

function isInnerLoop(
  cellValue: MapValue,
  lastLoopValue: MapValue,
  innerLoop: boolean
): boolean {
  // If first bit of loop I've seen we're in the inner loop
  // Ignore dashes
  if (cellValue === "-") {
    return innerLoop;
  }

  if (lastLoopValue === "L" && cellValue === "7") {
    return innerLoop;
  }

  if (lastLoopValue === "F" && cellValue === "J") {
    return innerLoop;
  }

  if (!innerLoop) {
    return true;
  }

  if ((lastLoopValue === "|" && cellValue === "L") || cellValue === "F") {
    return false;
  }
  return false;
}

function findS(startCoords: Coords, map: Map): MapValue {
  const sBounds = getBoundaryCoords(startCoords, map);

  const validVerticalPipe =
    sBounds["n"] != null &&
    sBounds["s"] != null &&
    isValidBoundary("|", "n", map[sBounds["n"][0]][sBounds["n"][1]]) &&
    isValidBoundary("|", "s", map[sBounds["s"][0]][sBounds["s"][1]]);

  const validHorizontalPipe =
    sBounds["e"] != null &&
    sBounds["w"] != null &&
    isValidBoundary("-", "e", map[sBounds["e"][0]][sBounds["e"][1]]) &&
    isValidBoundary("-", "w", map[sBounds["w"][0]][sBounds["w"][1]]);

  const validNEBend =
    sBounds["n"] != null &&
    sBounds["e"] != null &&
    isValidBoundary("L", "n", map[sBounds["n"][0]][sBounds["n"][1]]) &&
    isValidBoundary("L", "e", map[sBounds["e"][0]][sBounds["e"][1]]);

  const validNWBend =
    sBounds["n"] != null &&
    sBounds["w"] != null &&
    isValidBoundary("J", "n", map[sBounds["n"][0]][sBounds["n"][1]]) &&
    isValidBoundary("J", "w", map[sBounds["w"][0]][sBounds["w"][1]]);

  const validSWBend =
    sBounds["s"] != null &&
    sBounds["w"] != null &&
    isValidBoundary("7", "s", map[sBounds["s"][0]][sBounds["s"][1]]) &&
    isValidBoundary("7", "w", map[sBounds["w"][0]][sBounds["w"][1]]);

  const validSEBend =
    sBounds["s"] != null &&
    sBounds["e"] != null &&
    isValidBoundary("F", "s", map[sBounds["s"][0]][sBounds["s"][1]]) &&
    isValidBoundary("F", "e", map[sBounds["e"][0]][sBounds["e"][1]]);

  if (validVerticalPipe) {
    return "|";
  }
  if (validHorizontalPipe) {
    return "-";
  }
  if (validNEBend) {
    return "L";
  }
  if (validNWBend) {
    return "J";
  }
  if (validSWBend) {
    return "7";
  }
  if (validSEBend) {
    return "F";
  }
  return ".";
}

function isValidBoundary(
  currentValue: MapValue,
  nextValueRelativePosition: string,
  nextValue: MapValue
): boolean {
  const validNorth = nextValue === "|" || nextValue == "7" || nextValue === "F";
  const validSouth = nextValue === "|" || nextValue == "L" || nextValue === "J";
  const validEast = nextValue === "-" || nextValue == "J" || nextValue === "7";
  const validWest = nextValue === "-" || nextValue == "L" || nextValue === "F";

  if (currentValue === "." || nextValue === ".") {
    return false;
  }

  if (currentValue === "|") {
    if (nextValueRelativePosition === "s") {
      return validSouth;
    } else if (nextValueRelativePosition === "n") {
      return validNorth;
    } else {
      return false;
    }
  }

  if (currentValue === "-") {
    if (nextValueRelativePosition === "e") {
      return validEast;
    } else if (nextValueRelativePosition === "w") {
      return validWest;
    } else {
      return false;
    }
  }

  if (currentValue === "L") {
    if (nextValueRelativePosition === "n") {
      return validNorth;
    } else if (nextValueRelativePosition === "e") {
      return validEast;
    } else {
      return false;
    }
  }

  if (currentValue === "J") {
    if (nextValueRelativePosition === "n") {
      return validNorth;
    } else if (nextValueRelativePosition === "w") {
      return validWest;
    } else {
      return false;
    }
  }

  if (currentValue === "7") {
    if (nextValueRelativePosition === "s") {
      return validSouth;
    } else if (nextValueRelativePosition === "w") {
      return validWest;
    } else {
      return false;
    }
  }

  if (currentValue === "F") {
    if (nextValueRelativePosition === "s") {
      return validSouth;
    } else if (nextValueRelativePosition === "e") {
      return validEast;
    } else {
      return false;
    }
  }

  return false;
}

function coordsAreSame(a: Coords, b: Coords) {
  return a[0] === b[0] && a[1] === b[1];
}

/**
 *  return either the number of steps or null if an invalid path.
 */
function tracePath(startCoords: Coords, map: Map, sValue: MapValue): number {
  let count = 1;
  const getNextCoords = (prevCoords: Coords, currentCoords: Coords): Coords => {
    let currentValue = map[currentCoords[0]][currentCoords[1]];
    if (currentValue === "S") {
      currentValue = sValue;
    }
    let nextValidStep: Coords = [];
    const boundaries = getBoundaryCoords(currentCoords, map);
    for (const [position, boundary] of Object.entries(boundaries)) {
      // Check each boundary to see if a valid connection
      const nextValue = map[boundary[0]][boundary[1]];
      const isValid = isValidBoundary(
        currentValue,
        position,
        nextValue === "S" ? sValue : nextValue
      );
      if (isValid && !coordsAreSame(boundary, prevCoords)) {
        // If it's valid and not where we've just come from
        if (nextValidStep.length === 0) {
          // First one we've seen
          nextValidStep = boundary;
          //   console.log("Next Step:", nextValidStep);
          return nextValidStep;
        }
      }
    }
    return nextValidStep;
  };
  let nextCoords = getNextCoords(startCoords, startCoords);
  let prevCoords = startCoords;
  while (!coordsAreSame(nextCoords, startCoords)) {
    count++;
    let currentCoords = nextCoords;
    nextCoords = getNextCoords(prevCoords, currentCoords);
    prevCoords = currentCoords;
  }
  return count;
}

/**
 *  return either the number of steps or null if an invalid path.
 */
function documentPath(
  startCoords: Coords,
  map: Map,
  sValue: MapValue
): { [key: string]: MapValue } {
  const pathCoords: { [key: string]: MapValue } = {};
  const addCoords = (coords: Coords) =>
    (pathCoords[`${coords[0]}:${coords[1]}`] = map[coords[0]][coords[1]]);
  const getNextCoords = (prevCoords: Coords, currentCoords: Coords): Coords => {
    let currentValue = map[currentCoords[0]][currentCoords[1]];
    if (currentValue === "S") {
      currentValue = sValue;
    }
    let nextValidStep: Coords = [];
    const boundaries = getBoundaryCoords(currentCoords, map);
    for (const [position, boundary] of Object.entries(boundaries)) {
      // Check each boundary to see if a valid connection
      const nextValue = map[boundary[0]][boundary[1]];
      const isValid = isValidBoundary(
        currentValue,
        position,
        nextValue === "S" ? sValue : nextValue
      );
      if (isValid && !coordsAreSame(boundary, prevCoords)) {
        // If it's valid and not where we've just come from
        if (nextValidStep.length === 0) {
          // First one we've seen
          nextValidStep = boundary;
          //   console.log("Next Step:", nextValidStep);
          return nextValidStep;
        }
      }
    }
    return nextValidStep;
  };
  addCoords(startCoords);
  let nextCoords = getNextCoords(startCoords, startCoords);
  let prevCoords = startCoords;
  while (!coordsAreSame(nextCoords, startCoords)) {
    addCoords(nextCoords);
    let currentCoords = nextCoords;
    nextCoords = getNextCoords(prevCoords, currentCoords);
    prevCoords = currentCoords;
  }
  return pathCoords;
}
