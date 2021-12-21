package com.adventOfCode.twentyTwenty.daySix;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * --- Day 6: Custom Customs ---
 * As your flight approaches the regional airport where you'll switch to a much larger plane, customs declaration forms are distributed to the passengers.
 * <p>
 * The form asks a series of 26 yes-or-no questions marked a through z. All you need to do is identify the questions for which anyone in your group answers "yes". Since your group is just you, this doesn't take very long.
 * <p>
 * However, the person sitting next to you seems to be experiencing a language barrier and asks if you can help. For each of the people in their group, you write down the questions for which they answer "yes", one per line. For example:
 * <p>
 * abcx
 * abcy
 * abcz
 * In this group, there are 6 questions to which anyone answered "yes": a, b, c, x, y, and z. (Duplicate answers to the same question don't count extra; each question counts at most once.)
 * <p>
 * Another group asks for your help, then another, and eventually you've collected answers from every group on the plane (your puzzle input). Each group's answers are separated by a blank line, and within each group, each person's answers are on a single line. For example:
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
 * The first group contains one person who answered "yes" to 3 questions: a, b, and c.
 * The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
 * The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
 * The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
 * The last group contains one person who answered "yes" to only 1 question, b.
 * In this example, the sum of these counts is 3 + 3 + 3 + 1 + 1 = 11.
 * <p>
 * For each group, count the number of questions to which anyone answered "yes". What is the sum of those counts?
 */
public class DaySixPartOne implements PuzzleDay {

    private int getYesCountForGroup(String[] group) {
        Set<Character> yesAnswers = new HashSet();

        for (String person : group) {
            String trimmedPerson = person.trim();
            for (int i = 0; i < trimmedPerson.length(); i++) {
                yesAnswers.add(trimmedPerson.charAt(i));
            }
        }
        return yesAnswers.size();
    }

    @Override
    public void solvePuzzle() {
        int sum = 0;
        List<String> input = FileReader.readFileStringToListChunkByEmptyRow("src/main/java/com/adventOfCode/twentyTwenty/daySix/input.txt");
        for (String group : input) {
            sum += getYesCountForGroup(group.split(" "));
        }
        System.out.println("Sum is " + sum);
    }
}
