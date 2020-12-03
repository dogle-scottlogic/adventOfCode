package com.adventOfCode.twentyTwenty.dayThree;

import com.adventOfCode.common.FileReader;

import java.util.List;

/**
 * --- Part Two ---
 * Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.
 * <p>
 * Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:
 * <p>
 * Right 1, down 1.
 * Right 3, down 1. (This is the slope you already checked.)
 * Right 5, down 1.
 * Right 7, down 1.
 * Right 1, down 2.
 * In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.
 * <p>
 * What do you get if you multiply together the number of trees encountered on each of the listed slopes?
 */
public class DayThreePartTwo extends DayThree {
    @Override
    public void solvePuzzle() {
        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyTwenty/dayThree/input.txt");
        long total = 1;
        int[][] patterns = new int[][]{{1, 1}, {3, 1}, {5, 1}, {7, 1}, {1, 2}};

        for (int i = 0; i < patterns.length; i++) {
            int trees = this.traverseSlope(input, patterns[i][0], patterns[i][1]);
            total = total * trees;
        }

        System.out.println(total);
    }
}
