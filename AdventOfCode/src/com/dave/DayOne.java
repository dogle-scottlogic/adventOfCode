package com.dave;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class DayOne {
    public static int solveDayOne() {
        String pathName = "c://dev/adventOfCode/inputs/day1.txt";
        int total = 0;
        try (Stream<String> stream = Files.lines(Paths.get(pathName))) {
            int[] array = stream.mapToInt(i -> Integer.parseInt(i)).toArray();
            for(int i = 0; i < array.length; i++) {
                int initValue = fuelCalculation(array[i]);
                total += calcTotalFuel(initValue, initValue);
            }
            System.out.println(total);
        } catch (IOException e) {
            e.printStackTrace();
        }
        finally {
            return total;
        }
    }

    private static int calcTotalFuel(int fuel, int total) {
        int newFuel = fuelCalculation(fuel);
        if (newFuel <= 0) {
            return total;
        } else {
            total+= newFuel;
            return calcTotalFuel(newFuel, total);
        }
    }

    private static int fuelCalculation(int mass) {
        return (int)(mass / 3) - 2;
    }
}
