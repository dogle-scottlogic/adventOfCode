package com.adventOfCode.twentyTwenty.dayTwo;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.List;

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
