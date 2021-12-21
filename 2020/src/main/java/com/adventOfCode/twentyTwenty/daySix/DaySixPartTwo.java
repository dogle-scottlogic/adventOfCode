package com.adventOfCode.twentyTwenty.daySix;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.*;

/**
 * --- Part Two ---
 * As you finish the last group's customs declaration, you notice that you misread one word in the instructions:
 * <p>
 * You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!
 * <p>
 * Using the same example as above:
 * <p>
 * abc
 * <p>
 * a
 * b
 * c
 * <p>
 * ab
 * ac
 * <p>
 * a
 * a
 * a
 * a
 * <p>
 * b
 * This list represents answers from five groups:
 * <p>
 * In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
 * In the second group, there is no question to which everyone answered "yes".
 * In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
 * In the fourth group, everyone answered yes to only 1 question, a.
 * In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
 * In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.
 * <p>
 * For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?
 */
public class DaySixPartTwo implements PuzzleDay {
    private int getYesCountForGroup(String[] group) {
        Map<Character, Integer> yesCounts = new HashMap<>();
        int totalCount = 0;

        for (String person : group) {
            for (char answer : person.toCharArray()) {
                if (!yesCounts.containsKey(answer)) {
                    yesCounts.put(answer, 0);
                }

                int count = yesCounts.get(answer);
                count++;
                yesCounts.put(answer, count);

                if (yesCounts.get(answer) == group.length) {
                    totalCount++;
                }
            }
        }
        return totalCount;
    }

    @Override
    public void solvePuzzle() {
        int sum = 0;
        List<String> input = FileReader.readFileStringToListChunkByEmptyRow("src/main/java/com/adventOfCode/twentyTwenty/daySix/input.txt");
        for (String group : input) {
            sum += getYesCountForGroup(group.trim().split(" "));
        }
        System.out.println("Sum is " + sum);
    }
}
