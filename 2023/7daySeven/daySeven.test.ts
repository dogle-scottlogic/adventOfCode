import { describe, expect, it } from "@jest/globals";
import { CARD_MAPPING_ONE, getHandType, orderHands } from "./daySeven";

describe("getRangesFromMap", () => {
  it("returns the correct order with no tie breaks", () => {
    const hands = [
      "AAAAA",
      "AAAAK",
      "AAAKK",
      "KKK12",
      "AAKK1",
      "AA123",
      "12345",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "12345",
      "AA123",
      "AAKK1",
      "KKK12",
      "AAAKK",
      "AAAAK",
      "AAAAA",
    ]);
  });

  it("returns the correct order with a single tie break", () => {
    const hands = [
      "AAAAA",
      "AAAAK",
      "KKKKJ",
      "KKK12",
      "AAKK1",
      "AA123",
      "12345",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "12345",
      "AA123",
      "AAKK1",
      "KKK12",
      "KKKKJ",
      "AAAAK",
      "AAAAA",
    ]);
  });

  it("returns the correct order with a single tie break in a different order", () => {
    const hands = [
      "KKKKJ",
      "KKK12",
      "AAKK1",
      "AA123",
      "12345",
      "AAAAA",
      "AAAAK",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "12345",
      "AA123",
      "AAKK1",
      "KKK12",
      "KKKKJ",
      "AAAAK",
      "AAAAA",
    ]);
  });

  it("returns the correct order with multiple tie breaks", () => {
    const hands = [
      "AAA12",
      "KKK12",
      "JJJ12",
      "AA123",
      "12345",
      "AAAAA",
      "TT123",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "12345",
      "TT123",
      "AA123",
      "JJJ12",
      "KKK12",
      "AAA12",
      "AAAAA",
    ]);
  });

  it("returns the correct order with multiple tie breaks in a different order", () => {
    const hands = [
      "KKK12",
      "AA123",
      "12345",
      "JJJ12",
      "AAAAA",
      "AAA12",
      "TT123",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "12345",
      "TT123",
      "AA123",
      "JJJ12",
      "KKK12",
      "AAA12",
      "AAAAA",
    ]);
  });

  it("returns the correct order with all tie breaks in a different order", () => {
    const hands = [
      "KKK12",
      "AAA23",
      "11145",
      "TTT12",
      "333KA",
      "88812",
      "QQQ12",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([
      "11145",
      "333KA",
      "88812",
      "TTT12",
      "QQQ12",
      "KKK12",
      "AAA23",
    ]);
  });

  it("returns the correct order with a single hand", () => {
    const hands = ["11145"];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual(["11145"]);
  });

  it("returns the correct order with a high card", () => {
    const hands = ["11112", "11113"];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual(["11112", "11113"]);
  });

  it("returns the correct order with a large volume", () => {
    const hands = [
      "K99QT",
      "TKQ7T",
      "22A7J",
      "267J9",
      "665JJ",
      "K856J",
      "977K9",
      "KKK8K",
      "53697",
      "3J337",
      "84A9K",
      "K4289",
      "4JA46",
      "K452K",
      "3K48Q",
      "99TT9",
      "A7JA9",
      "836AT",
      "J2KKK",
      "KK7KK",
      "QTAJK",
      "T4578",
      "TK55T",
      "44K9J",
      "KQT58",
      "66A6J",
      "K77KK",
      "6666Q",
      "8J8KJ",
      "69KQ7",
      "T27J3",
      "44999",
      "98885",
      "55655",
      "43343",
      "82247",
      "33336",
      "59JT4",
      "AQAJA",
      "J3626",
      "9379A",
      "JTTTA",
      "442A6",
      "73933",
    ];
    const result = orderHands(hands, CARD_MAPPING_ONE, getHandType);
    expect(result).toStrictEqual([]);
  });
});
