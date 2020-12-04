package com.adventOfCode.twentyNineteen.dayThree;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.*;

public class DayThreePartOne implements PuzzleDay {

    private List<Coord> seen = new ArrayList();
    private int currentX = 0;
    private int currentY = 0;

    private void findAllCoords(String wire) {
        currentX = 0;
        currentY = 0;
        String[] instructions = wire.split(",");

        for (int i = 0; i < instructions.length; i++) {
            Coord coord = findNextCoord(instructions[i], currentX, currentY);
            seen.add(coord);
        }
    }

    private List getCrossingCoords(String secondWire) {
        currentX = 0;
        currentY = 0;
        String[] instructions = secondWire.split(",");
        ArrayList<int[]> crossing = new ArrayList<>();

        for (int i = 0; i < instructions.length; i++) {
            Coord coord = findNextCoord(instructions[i], currentX, currentY);
            int [] crossingCoords = isCrossingCoord(coord);
            if (crossingCoords != null) {
                crossing.add(crossingCoords);
            }

        }
        return crossing;
    }

    private int[] isCrossingCoord(Coord coord) {
        for (Coord firstCoord : seen) {
            if ((coord.getStaticAxis() == 'X' && firstCoord.getStaticAxis() == 'Y') || (coord.getStaticAxis() == 'Y' && firstCoord.getStaticAxis() == 'X')) {
                int minA = firstCoord.getRangeCoord()[0];
                int maxA = firstCoord.getRangeCoord()[1];
                int minB = coord.getRangeCoord()[0];
                int maxB = coord.getRangeCoord()[1];
                if (coord.getStaticCoord() >= minA && coord.getStaticCoord() <= maxA &&
                        firstCoord.getStaticCoord() >= minB && firstCoord.getStaticCoord() <= maxB) {
                    return firstCoord.getStaticAxis() == 'X' ?
                            new int[] { firstCoord.getStaticCoord(), coord.getStaticCoord() } :
                            new int[] { coord.getStaticCoord(), firstCoord.getStaticCoord() };
                }
            }
        }
        return null;
    }

    private Coord findNextCoord(String instruction, int currentX, int currentY) {
        char direction = instruction.charAt(0);
        int value = Integer.parseInt(instruction.substring(1));
        Coord coord;

        switch (direction) {
            case 'U':
                coord = new Coord('X', currentX, new int[]{currentY, currentY + value});
                this.currentY += value;
                return coord;
            case 'D':
                coord = new Coord('X', currentX, new int[]{currentY - value, currentY});
                this.currentY -= value;
                return coord;
            case 'L':
                coord = new Coord('Y', currentY, new int[]{currentX - value, currentX});
                this.currentX -= value;
                return coord;
            case 'R':
                coord = new Coord('Y', currentY, new int[]{currentX, currentX + value});
                this.currentX += value;
                return coord;
            default:
                return null;
        }
    }

    private int getClosestManhattanDistance(List<int[]> crossings) {
        int minDistance = 0;

        for (int[] coords : crossings) {
            int mDistance = Math.abs(coords[0]) + Math.abs(coords[1]);

            if (minDistance == 0 || mDistance < minDistance) {
                minDistance = mDistance;
            }

        }
        return minDistance;
    }

    @Override
    public void solvePuzzle() {

        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyNineteen/dayThree/input.txt");
        String firstWire = input.get(0);
        String secondWire = input.get(1);
        findAllCoords(firstWire);
        List crossingCoors = getCrossingCoords(secondWire);
        System.out.println("result:" + getClosestManhattanDistance(crossingCoors));


    }
}
