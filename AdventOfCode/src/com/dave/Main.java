package com.dave;

import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;

public class Main {

    public static void main(String[] args) {
       String pathName = "c://dev/adventOfCode/inputs/day1.txt";
        try (Stream<String> stream = Files.lines(Paths.get(pathName))) {
            int total = 0;
            int[] array = stream.mapToInt(i -> Integer.parseInt(i)).toArray();
            for(int i = 0; i < array.length; i++) {
                total += fuelCalculation(array[i]);
            }
            System.out.println(total);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int fuelCalculation(int mass) {
        return (int)(mass / 3) - 2;
    }
}
