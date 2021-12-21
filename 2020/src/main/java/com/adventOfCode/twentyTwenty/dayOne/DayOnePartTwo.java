package com.adventOfCode.twentyTwenty.dayOne;

import com.adventOfCode.common.FileReader;

import java.util.Collections;
import java.util.List;

/**
 * --- Part Two ---
 * The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.
 *
 * Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.
 *
 * In your expense report, what is the product of the three entries that sum to 2020?
 */
public class DayOnePartTwo extends DayOne {

    private Integer getResult(List<Integer> input) {
        int goal = 2020;
        Collections.sort(input);


        for (int i = 0; i < input.size(); i++) {
            Integer currentValue = input.get(i);
            Integer subGoal = goal - currentValue;
            Integer[] foundSubGoal = this.getTwoValuesThatSumToGoal(input, subGoal);

            if(foundSubGoal != null) {
                return currentValue * foundSubGoal[0] * foundSubGoal[1];
            }

        }
        return -1;
    }

    @Override
    public void solvePuzzle() {
        List<Integer> input = FileReader.readFileInts("src/main/java/com/adventOfCode/twentyTwenty/dayOne/input.txt");
        Collections.sort(input);
        Integer result = getResult(input);
        System.out.println(result >= 0 ? "Result part one is: " + result : "Not found");
    }
}
