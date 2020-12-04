package com.adventOfCode.common;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
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

    public static List<String> readFileStringToList(String filePath) {
        List<String> list = new ArrayList<>();
        try {
            Scanner scanner = new Scanner(new File(filePath));
            while (scanner.hasNextLine()) {
                list.add(scanner.nextLine());
            }
        } catch (Exception e) {
            System.out.println("Error reading in file: " + e.getMessage());
        }
        return list;
    }

    public static List<String> readFileStringToListChunkByEmptyRow(String filePath) {
        List<String> list = new ArrayList<>();
        try {
            String line = "";
            Scanner scanner = new Scanner(new File(filePath));
            while (scanner.hasNextLine()) {
                String nextLine = scanner.nextLine();
                if (nextLine.trim().isEmpty()) {
                    list.add(line);
                    line = "";
                } else {
                    line = line + " " + nextLine;

                    if(!scanner.hasNextLine()) {
                        list.add(line);
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Error reading in file: " + e.getMessage());
        }
        return list;
    }


    public static String readFileString(String filePath) {
        String result = "";
        try {
            Path path = Path.of(filePath);
            result = Files.readString(path, StandardCharsets.US_ASCII);
        }
        catch (Exception e ) {
            System.out.println("Error reading in file: " + e.getMessage());
        }
        return result;
    }

}
