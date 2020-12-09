package com.adventOfCode.twentyTwenty.dayNine;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.Arrays;
import java.util.List;

/**
 * --- Part Two ---
 * The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.
 * <p>
 * Again consider the above example:
 * <p>
 * 35
 * 20
 * 15
 * 25
 * 47
 * 40
 * 62
 * 55
 * 65
 * 95
 * 102
 * 117
 * 150
 * 182
 * 127
 * 219
 * 299
 * 277
 * 309
 * 576
 * In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)
 * <p>
 * To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.
 * <p>
 * What is the encryption weakness in your XMAS-encrypted list of numbers?
 */
public class DayNinePartTwo implements PuzzleDay {

    private List<Integer> findRange(List<Integer> input, int goal) {
        for (int startIndex = 0; startIndex < input.size(); startIndex++) {
            int sum = 0;
            for (int endIndex = startIndex; endIndex < input.size(); endIndex++) {
                sum += input.get(endIndex);

                if (sum == goal) {
                    return input.subList(startIndex, endIndex + 1);
                }

                if (sum > goal) {
                    break;
                }
            }
        }
        return null;
    }

    @Override
    public void solvePuzzle() {
        final int goal = 177777905;
        final List<Integer> input = FileReader.readFileInts("src/main/java/com/adventOfCode/twentyTwenty/dayNine/input.txt");
        List<Integer> result = findRange(input, goal);
        Integer[] range = new Integer[result.size()];
        range = result.toArray(range);
        Arrays.sort(range);
        int total = range[0] + range[range.length - 1];
        System.out.println("Result = " + total);
    }
}
