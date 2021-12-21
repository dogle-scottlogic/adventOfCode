package com.adventOfCode.twentyTwenty.dayTwo;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.List;

/**
 * --- Part Two ---
 * While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.
 * <p>
 * The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.
 * <p>
 * Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.
 * <p>
 * Given the same example list from above:
 * <p>
 * 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
 * 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
 * 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
 * How many passwords are valid according to the new interpretation of the policies?
 */
public class DayTwoPartTwo implements PuzzleDay {
    private boolean isValidPassword(String range, String letterString, String password) {
        String[] rangeSplit = range.split("-");
        int firstIndex = Integer.parseInt(rangeSplit[0]) - 1;
        int secondIndex = Integer.parseInt(rangeSplit[1]) - 1;
        char letter = letterString.charAt(0);

        if (
                (password.charAt(firstIndex) == letter && password.charAt(secondIndex) != letter) ||
                        (password.charAt(secondIndex) == letter && password.charAt(firstIndex) != letter)
        ) {
            return true;
        }
        return false;
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
