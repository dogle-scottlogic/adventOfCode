package com.adventOfCode.twentyTwenty.dayFive;

import com.adventOfCode.common.FileReader;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * --- Part Two ---
 * Ding! The "fasten seat belt" signs have turned on. Time to find your seat.
 * <p>
 * It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.
 * <p>
 * Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.
 * <p>
 * What is the ID of your seat?
 */
public class DayFivePartTwo extends DayFive {

    private int findMySeat(int[] seatIds) {
        int lastSeat = -1;

        for (int i = 0; i < seatIds.length; i++) {
            if (lastSeat > 0 && seatIds[i] != lastSeat + 1) {
                return lastSeat + 1;
            }
            lastSeat = seatIds[i];
        }
        return -1;
    }

    @Override
    public void solvePuzzle() {
        List<String> input = FileReader.readFileStringToList("src/main/java/com/adventOfCode/twentyTwenty/dayFive/input.txt");
        int[] seatIds = new int[input.size()];

        for (int i = 0; i < input.size(); i++) {
            int rowNumber = getRowNumber(input.get(i));
            int columnNumber = getColumnNumber(input.get(i));
            int seatId = rowNumber * 8 + columnNumber;
            seatIds[i] = seatId;
        }
        Arrays.sort(seatIds);

        System.out.println("My Seat is " + findMySeat(seatIds));
    }
}
