package com.adventOfCode.twentyTwenty.dayTwo;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.List;

/**
 * --- Day 2: Password Philosophy ---
 * Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.
 * <p>
 * The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.
 * <p>
 * Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.
 * <p>
 * To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.
 * <p>
 * For example, suppose you have the following list:
 * <p>
 * 1-3 a: abcde
 * 1-3 b: cdefg
 * 2-9 c: ccccccccc
 * Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.
 * <p>
 * In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.
 * <p>
 * How many passwords are valid according to their policies?
 */
public class DayTwoPartOne implements PuzzleDay {

    private boolean isValidPassword(String range, String letterString, String password) {
        int foundCount = 0;
        String[] rangeSplit = range.split("-");
        int min = Integer.parseInt(rangeSplit[0]);
        int max = Integer.parseInt(rangeSplit[1]);
        char letter = letterString.charAt(0);

        for (int i = 0; i < password.length(); i++) {
            if (password.charAt(i) == letter) {
                foundCount++;
            }

            if (foundCount > max) {
                return false;
            }
        }
        return foundCount >= min;
    }

    @Override
    public void solvePuzzle() {
        int count = 0;
        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyTwenty/dayTwo/input.txt");

        for (int i = 0; i < input.size(); i++) {
            String[] parts = input.get(i).split(" ");
            boolean valid = isValidPassword(parts[0], parts[1], parts[2]);
            if (valid) {
                count++;
            }
        }

        System.out.println("Number of valid passwords: " + count);

    }
}
