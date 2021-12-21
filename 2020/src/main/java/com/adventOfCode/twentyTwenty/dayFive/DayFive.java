package com.adventOfCode.twentyTwenty.dayFive;

import com.adventOfCode.common.PuzzleDay;

public abstract class DayFive implements PuzzleDay {
    private int getMiddleValue(String data, int min, int max, char lower) {
        double currentMin = min;
        double currentMax = max;

        for (int i = 0; i < data.length(); i++) {
            char currentChar = data.charAt(i);
            double midPoint = (currentMax - currentMin) / 2;

            if (midPoint < 1) {
                return currentChar == lower ? (int) currentMin : (int) currentMax;
            }

            if (currentChar == lower) {
                currentMax = currentMax - Math.ceil(midPoint);
            } else {
                currentMin = currentMin + Math.ceil(midPoint);
            }

        }
        return -1;
    }

    protected int getRowNumber(String boardingPassNumber) {
        String rowData = boardingPassNumber.substring(0, 7);
        int min = 0;
        int max = 127;
        return getMiddleValue(rowData, min, max, 'F');
    }

    protected int getColumnNumber(String boardingPassNumber) {
        String rowData = boardingPassNumber.substring(7);
        int min = 0;
        int max = 7;
        return getMiddleValue(rowData, min, max, 'L');
    }
}
