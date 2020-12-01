package com.adventOfCode.twentyTwenty.dayOne;

import com.adventOfCode.common.PuzzleDay;

import java.util.List;

public abstract class DayOne implements PuzzleDay {

    private Integer findValue(Integer toFind, List<Integer> sortedList) {
        for (int i = sortedList.size() -1; i >= 0; i--) {
            if (sortedList.get(i) < toFind) {
                return -1;
            }

            if (sortedList.get(i).equals(toFind)) {
                return sortedList.get(i);
            }
        }
        return -1;
    }

    protected Integer[] getTwoValuesThatSumToGoal(List<Integer> sortedInput, Integer goal) {

        for (int i = 0; i < sortedInput.size(); i++) {
            Integer currentValue = sortedInput.get(i);
            Integer toFind = goal - currentValue;
            Integer found = this.findValue(toFind, sortedInput);

            if (found >= 0) {
                return new Integer[]{found, currentValue};
            }
        }
        return null;
    }

}
