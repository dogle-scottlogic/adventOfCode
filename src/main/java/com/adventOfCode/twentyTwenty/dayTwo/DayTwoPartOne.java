package com.adventOfCode.twentyTwenty.dayTwo;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.List;

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

        for (int i = 0; i < input.size(); i++ ) {
            String[] parts = input.get(i).split(" ");
            boolean valid = isValidPassword(parts[0], parts[1], parts[2]);
            if (valid) {
                count++;
            }
        }

        System.out.println("Number of valid passwords: " + count);

    }
}
