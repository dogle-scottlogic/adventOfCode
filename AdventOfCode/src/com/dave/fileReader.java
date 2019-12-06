package com.dave;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;

public class FileReader {
    public static int[] readFile(String pathName) {
        try (Stream<String> stream = Files.lines(Paths.get(pathName))) {
            return stream.mapToInt(i -> Integer.parseInt(i)).toArray();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static int[] readCsvFile(String pathname) {
        try (Stream<String> stream = Files.lines(Paths.get(pathName))) {
            return stream.flatMap(i -> i.split("\\*,")).map(s -> (int)s);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
