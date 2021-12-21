package com.adventOfCode.twentyTwenty.dayThree;

import com.adventOfCode.common.FileReader;

import java.util.List;

/**
 * --- Day 3: Toboggan Trajectory ---
 * With the toboggan login problems resolved, you set off toward the airport. While travel by toboggan might be easy, it's certainly not safe: there's very minimal steering and the area is covered in trees. You'll need to see which angles will take you near the fewest trees.
 * <p>
 * Due to the local geology, trees in this area only grow on exact integer coordinates in a grid. You make a map (your puzzle input) of the open squares (.) and trees (#) you can see. For example:
 * <p>
 * ..##.......
 * #...#...#..
 * .#....#..#.
 * ..#.#...#.#
 * .#...##..#.
 * ..#.##.....
 * .#.#.#....#
 * .#........#
 * #.##...#...
 * #...##....#
 * .#..#...#.#
 * These aren't the only trees, though; due to something you read about once involving arboreal genetics and biome stability, the same pattern repeats to the right many times:
 * <p>
 * ..##.........##.........##.........##.........##.........##.......  --->
 * #...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
 * .#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
 * ..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
 * .#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
 * ..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....  --->
 * .#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
 * .#........#.#........#.#........#.#........#.#........#.#........#
 * #.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
 * #...##....##...##....##...##....##...##....##...##....##...##....#
 * .#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
 * You start on the open square (.) in the top-left corner and need to reach the bottom (below the bottom-most row on your map).
 * <p>
 * The toboggan can only follow a few specific slopes (you opted for a cheaper model that prefers rational numbers); start by counting all the trees you would encounter for the slope right 3, down 1:
 * <p>
 * From your starting position at the top-left, check the position that is right 3 and down 1. Then, check the position that is right 3 and down 1 from there, and so on until you go past the bottom of the map.
 * <p>
 * The locations you'd check in the above example are marked here with O where there was an open square and X where there was a tree:
 * <p>
 * ..##.........##.........##.........##.........##.........##.......  --->
 * #..O#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
 * .#....X..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
 * ..#.#...#O#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
 * .#...##..#..X...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
 * ..#.##.......#.X#.......#.##.......#.##.......#.##.......#.##.....  --->
 * .#.#.#....#.#.#.#.O..#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
 * .#........#.#........X.#........#.#........#.#........#.#........#
 * #.##...#...#.##...#...#.X#...#...#.##...#...#.##...#...#.##...#...
 * #...##....##...##....##...#X....##...##....##...##....##...##....#
 * .#..#...#.#.#..#...#.#.#..#...X.#.#..#...#.#.#..#...#.#.#..#...#.#  --->
 * In this example, traversing the map using this slope would cause you to encounter 7 trees.
 * <p>
 * Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?
 */
public class DayThreePartOne extends DayThree {

    @Override
    public void solvePuzzle() {
        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyTwenty/dayThree/input.txt");
        int treesFound = this.traverseSlope(input, 3, 1);
        System.out.println(treesFound);
    }
}
