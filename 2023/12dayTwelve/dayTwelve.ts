// https://adventofcode.com/2023/day/12

import * as fs from "fs";

type MapValue = "?" | "#" | ".";
type ConditionRecord = {
  recordA: MapValue[];
  recordB: number[];
};

function readData() {
  const words = fs.readFileSync("data/12-1.txt", "utf-8");
  return words.split("\r\n");
}

export function dayTwelvePartOne() {
  const data = readData();
  const records = parseRecords(data);
  let sum = 0;

  getPossibleArrangements(records[0]);
  //   records.forEach((record) => {
  //     const possibleArrangements = getPossibleArrangements(record);
  //     sum += possibleArrangements;
  //   });

  //   console.log(sum);
}

export function getPossibleArrangements(record: ConditionRecord) {
  const { recordA, recordB } = record;
  let possibleArrangements = 0;
  // Map of recordB index to possible positions
  const allViablePositions: { [key: string]: number[] } = getAllViablePositions(
    recordA,
    recordB
  );

  // Find any that are length one and put them in
  // Take what's left and itterate the options
  // put first thing in place then check the others are valid still.
  // If they are add to a list of valid configs

  // A clone of allViable positions used to store what I've checked already
  const allCheckedPositions: { [key: string]: number } = {};
  const done = false;

  for (const [key] of Object.keys(allViablePositions)) {
    allCheckedPositions[key] = -1;
  }

  while (!done) {
    // get next viable test
    const currentTestValues: number[] = [];
    for (const [key, value] of Object.entries(allViablePositions)) {
      if (key === "0") {
        const positions = allViablePositions[key];
        currentTestValues.push(positions[allCheckedPositions[key] + 1]);
        allCheckedPositions[key]++; // 0 should always be valid so consider checked
      } else {
        // allCheckedPositions[key]++;
        const positions = allViablePositions[key];
        const value = positions[allCheckedPositions[key] + 1];
        if (value <= currentTestValues[currentTestValues.length - 1]) {
            allCheckedPositions[key]++;
        //   const nextHighestIndex = positions.findIndex(
        //     (p) => p > currentTestValues[currentTestValues.length - 1]
        //   );
        //   if (nextHighestIndex != -1) {
        //     currentTestValues.push(positions[allCheckedPositions[key] + 1]);
        //     allCheckedPositions[key]++; // 0 should always be valid so consider checked
        //   }
        }
      }
    }
    console.log("check ")
  }

  console.log(allViablePositions);
  return 0;
}

function getAllViablePositions(recordA: MapValue[], recordB: number[]) {
  // Map of recordB index to possible positions
  const allViablePositions: { [key: number]: number[] } = {};
  console.log("Record: ", recordA);
  const isValidBookend = (value: MapValue) => value === "." || value === "?";

  const isValidBlock = (
    index: number,
    record: MapValue[],
    numberOfBrokenSprings: number
  ) => {
    const relevantSubRecord = record.slice(
      index,
      index + numberOfBrokenSprings
    );
    const validStart = index === 0 || isValidBookend(record[index - 1]);
    const validMiddle =
      relevantSubRecord.every((x, i) => x === relevantSubRecord[i]) &&
      (relevantSubRecord[0] === "#" || relevantSubRecord[0] === "?");
    const endIndex = index + relevantSubRecord.length;
    const validEnd =
      endIndex >= record.length || isValidBookend(record[endIndex]);
    return validStart && validMiddle && validEnd;
  };

  recordB.forEach((b, i) => {
    const viablePositions = [];
    for (
      let indexOfRecordA = 0;
      indexOfRecordA < recordA.length;
      indexOfRecordA++
    ) {
      const isValid = isValidBlock(indexOfRecordA, recordA, b);
      if (isValid) {
        viablePositions.push(indexOfRecordA); // b can be inserted at index
      }
      //   console.log(
      //     "For spring: ",
      //     b,
      //     " index ",
      //     indexOfRecordA,
      //     " is ",
      //     `${isValid ? "valid" : "not valid"}`
      //   );
    }
    allViablePositions[i] = viablePositions;
  });
  return allViablePositions;
}

export function parseRecords(data: string[]) {
  const records: ConditionRecord[] = [];
  data.forEach((d) => {
    const parts = d.split(" ");
    records.push({
      recordA: Array.from(parts[0]) as MapValue[],
      recordB: parts[1].split(",").map((x) => Number(x)),
    });
  });
  return records;
}
