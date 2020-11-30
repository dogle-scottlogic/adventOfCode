package com.adventOfCode.common;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class FileReader {

    public static List<Integer> readFileInts(String filePath) {
        List<Integer> list = new ArrayList<>();
        try {
            Scanner scanner = new Scanner(new File(filePath));
            while (scanner.hasNextInt()) {
                list.add(scanner.nextInt());
            }
        } catch (Exception e) {
            System.out.println("Error reading in file: " + e.getMessage());
        }
        return list;
    }

}
