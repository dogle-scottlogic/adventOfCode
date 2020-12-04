package com.adventOfCode.twentyTwenty.dayFour;

import com.adventOfCode.common.FileReader;
import com.adventOfCode.common.PuzzleDay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * --- Day 4: Passport Processing ---
 * You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.
 * <p>
 * It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.
 * <p>
 * Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.
 * <p>
 * The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:
 * <p>
 * byr (Birth Year)
 * iyr (Issue Year)
 * eyr (Expiration Year)
 * hgt (Height)
 * hcl (Hair Color)
 * ecl (Eye Color)
 * pid (Passport ID)
 * cid (Country ID)
 * Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.
 * <p>
 * Here is an example batch file containing four passports:
 * <p>
 * ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
 * byr:1937 iyr:2017 cid:147 hgt:183cm
 * <p>
 * iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
 * hcl:#cfa07d byr:1929
 * <p>
 * hcl:#ae17e1 iyr:2013
 * eyr:2024
 * ecl:brn pid:760753108 byr:1931
 * hgt:179cm
 * <p>
 * hcl:#cfa07d eyr:2025 pid:166559648
 * iyr:2011 ecl:brn hgt:59in
 * The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).
 * <p>
 * The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.
 * <p>
 * The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.
 * <p>
 * According to the above rules, your improved system would report 2 valid passports.
 * <p>
 * Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?
 */
public class DayFourPartOne extends DayFour {

    @Override
    public void solvePuzzle() {
        List<String> input = FileReader.readFileStringToListChunkByEmptyRow("src/main/java/com/adventOfCode/twentyTwenty/dayFour/input.txt");
        int validCount = 0;

        for (String passport : input) {
            boolean passportValid = isPassportValid(passport);

            if (passportValid) {
                validCount++;
            }
        }

        System.out.println("Result: " + validCount);
    }
}
