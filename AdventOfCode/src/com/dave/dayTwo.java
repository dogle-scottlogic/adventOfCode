package com.dave;

public class DayTwo {
    public static int solveDayTwo() {
        String pathName = "c://dev/adventOfCode/inputs/day2.txt";
        int[] input = FileReader.readFile(pathName);

        for(int i = 0; i < input.length; i++) {
            int opCodePosition = i % 4;
            System.out.println(opCodePosition);
        }

        return 0;
    }
}
