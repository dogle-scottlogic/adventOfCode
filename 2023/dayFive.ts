// https://adventofcode.com/2023/day/5

import * as fs from "fs";

function readData(): { [key: string]: string[] } {
  const data: { [key: string]: string[] } = {};
  const words = fs.readFileSync("data/5-1.txt", "utf-8");
  const parts = words.split(/\n\s*\n/);
  parts.forEach((part) => {
    const keys = part.split(":");
    data[keys[0].replace(" map", "")] = keys[1]
      .replace(/(\n)/gm, "")
      .split(/\r/gm)
      .filter((x) => x !== "")
      .map((x) => x.trim());
  });
  return data;
}

class RangeMapping {
  ranges: {
    destinationRangeStart: number;
    sourceRangeStart: number;
    destinationRangeEnd: number;
    sourceRangeEnd: number;
    rangeLength: number;
  }[];

  constructor(mapping: string[]) {
    this.ranges = [];
    mapping.forEach((range) => {
      const parts = range.split(/\s+/);
      const destinationRangeStart = Number(parts[0]);
      const sourceRangeStart = Number(parts[1]);
      const rangeLength = Number(parts[2]);
      this.ranges.push({
        destinationRangeStart,
        destinationRangeEnd: destinationRangeStart + rangeLength,
        sourceRangeStart,
        sourceRangeEnd: sourceRangeStart + rangeLength,
        rangeLength,
      });
    });
  }

  getMapping(value: number) {
    const range = this.ranges.find(
      (range) =>
        value >= range.sourceRangeStart && value <= range.sourceRangeEnd
    );
    if (range) {
      const offset = range.sourceRangeStart - range.destinationRangeStart;
      return value - offset;
    } else {
      return value;
    }
  }
}

export function dayFivePartOne() {
  console.log("Day five part 1:");
  const data = readData();
  const seeds: number[] = data["seeds"][0].split(" ").map((x) => Number(x));
  const seedToSoilMap = getMap(data["seed-to-soil"]);
  const soilToFertilizerMap = getMap(data["soil-to-fertilizer"]);
  const fertilizerToWaterMap = getMap(data["fertilizer-to-water"]);
  const waterToLightMap = getMap(data["water-to-light"]);
  const lightToTempMap = getMap(data["light-to-temperature"]);
  const tempToHumidity = getMap(data["temperature-to-humidity"]);
  const humidityToLocation = getMap(data["humidity-to-location"]);

  const chain = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTempMap,
    tempToHumidity,
    humidityToLocation,
  ];
  let inputOutput = seeds;
  const testKey = [
    "soil",
    "fert",
    "water",
    "light",
    "temp",
    "humid",
    "location",
  ];
  chain.forEach((mapping, i) => {
    inputOutput = getDestinationFromSource(inputOutput, mapping);
    console.log(i, ":Output ", testKey[i], ":", inputOutput);
  });

  const result = inputOutput.reduce((c, p) => {
    return p < c ? p : c;
  });
  console.log(result);
}

function getDestinationFromSource(
  source: number[],
  map: RangeMapping
): number[] {
  const destination: number[] = [];
  source.forEach((item) => {
    destination.push(map.getMapping(item));
  });
  return destination;
}

/**
 * Return a map of a to b numbers where there are given ranges
 */
function getMap(mapping: string[]): RangeMapping {
  return new RangeMapping(mapping);
}
