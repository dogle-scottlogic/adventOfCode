package com.adventOfCode.twentyTwenty.dayOne;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.Collections;
import java.util.List;

/**
 * --- Day 1: Report Repair ---
 * After saving Christmas five years in a row, you've decided to take a vacation at a nice resort on a tropical island. Surely, Christmas will go on without you.
 * <p>
 * The tropical island has its own currency and is entirely cash-only. The gold coins used there have a little picture of a starfish; the locals just call them stars. None of the currency exchanges seem to have heard of them, but somehow, you'll need to find fifty of these coins by the time you arrive so you can pay the deposit on your room.
 * <p>
 * To save your vacation, you need to get all fifty stars by December 25th.
 * <p>
 * Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
 * <p>
 * Before you leave, the Elves in accounting just need you to fix your expense report (your puzzle input); apparently, something isn't quite adding up.
 * <p>
 * Specifically, they need you to find the two entries that sum to 2020 and then multiply those two numbers together.
 * <p>
 * For example, suppose your expense report contained the following:
 * <p>
 * 1721
 * 979
 * 366
 * 299
 * 675
 * 1456
 * In this list, the two entries that sum to 2020 are 1721 and 299. Multiplying them together produces 1721 * 299 = 514579, so the correct answer is 514579.
 * <p>
 * Of course, your expense report is much larger. Find the two entries that sum to 2020; what do you get if you multiply them together?
 */
public class DayOnePartOne extends DayOne {

    public DayOnePartOne() {
        super();
    }

    private Integer getResult(List<Integer> input) {
        int goal = 2020;
        Collections.sort(input);

        Integer[] result = this.getTwoValuesThatSumToGoal(input, goal);

        if (result != null) {
            return result[0] * result[1];
        }

        return -1;
    }

    @Override
    public void solvePuzzle() {
        List<Integer> input = FileReader.readFileInts("src/main/java/com/adventOfCode/twentyTwenty/dayOne/input.txt");
        Integer result = getResult(input);
        System.out.println(result >= 0 ? "Result part two is: " + result : "Not found");
    }
}
