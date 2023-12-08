// https://adventofcode.com/2023/day/7

import * as fs from "fs";

function readData() {
  const words = fs.readFileSync("data/7-1.txt", "utf-8");
  return words.split("\r\n");
}

function getHands(): { [key: string]: number } {
  const hands: { [key: string]: number } = {};
  const data = readData();
  data.forEach((line) => {
    const parts = line.split(" ");
    hands[parts[0]] = Number(parts[1]);
  });
  return hands;
}

const CARD_MAPPING: { [key: string]: number } = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

type HAND_TYPE = "FiveOAK" | "FourOAK" | "FH" | "ThreeOAK" | "TP" | "OP" | "HC";

export function daySevenPartOne() {
  let sum = 0;
  const hands = getHands();
//   const test = orderHands([
//     "K99QT",
//     "TKQ7T",
//     "22A7J",
//     "267J9",
//     "665JJ",
//     "K856J",
//     "977K9",
//     "KKK8K",
//     "53697",
//     "3J337",
//     "84A9K",
//     "K4289",
//     "4JA46",
//     "K452K",
//     "3K48Q",
//     "99TT9",
//     "A7JA9",
//     "836AT",
//     "J2KKK",
//     "KK7KK",
//     "QTAJK",
//     "T4578",
//     "TK55T",
//     "44K9J",
//     "KQT58",
//     "66A6J",
//     "K77KK",
//     "6666Q",
//     "8J8KJ",
//     "69KQ7",
//     "T27J3",
//     "44999",
//     "98885",
//     "55655",
//     "43343",
//     "82247",
//     "33336",
//     "59JT4",
//     "AQAJA",
//     "J3626",
//     "9379A",
//     "JTTTA",
//     "442A6",
//     "73933",
//   ]);
//   test.forEach(t => {
//     console.log("Hand: ", t, " Type ", getHandType(t));
//   })
    const orderedHands = orderHands(Object.keys(hands));
    orderedHands.forEach((oh, i) => {
      // console.log("hand score:", hands[oh], " rank: ", i + 1);
      sum += hands[oh] * (i + 1);
    });
  console.log(sum);
}

function getHandType(hand: string): HAND_TYPE {
  // console.log(hand);
  // Collated cards maps a card (e.g "K" to a count for that card in the hand)
  const collatedCards: { [card: string]: number } = {};
  let handType: HAND_TYPE = "HC";

  const checkType = (count: number, card: string) => {
    // One Pair
    if (handType === "HC" && count === 2) {
      return "OP";
    }
    // Two Pair
    if (handType === "OP" && count === 2) {
      return "TP";
    }
    // Three of a kind
    if (handType === "OP" && collatedCards[card] === 3 && count === 3) {
      return "ThreeOAK";
    }
    // Full House
    if (
      (handType === "OP" && count === 3) ||
      (handType === "TP" && count === 3) ||
      (handType === "ThreeOAK" && count == 2)
    ) {
      return "FH";
    }
    // Four of a kind
    if (count === 4) {
      return "FourOAK";
    }
    // Five of a kind
    if (count === 5) {
      return "FiveOAK";
    }
    return "HC";
  };

  for (let cardIndex = 0; cardIndex < hand.length; cardIndex++) {
    const currentValue = collatedCards[hand[cardIndex]];
    if (currentValue) {
      collatedCards[hand[cardIndex]]++;
      handType = checkType(collatedCards[hand[cardIndex]], hand[cardIndex]);
    } else {
      collatedCards[hand[cardIndex]] = 1;
    }
  }

  return handType;
}

function getTieBreakWinner(firstHand: string, secondHand: string): string {
  const cardValue = (card: string) =>
    CARD_MAPPING[card] ? CARD_MAPPING[card] : Number(card);
  for (let i = 0; i < firstHand.length; i++) {
    if (cardValue(firstHand[i]) > cardValue(secondHand[i])) {
      return firstHand;
    } else if (cardValue(secondHand[i]) > cardValue(firstHand[i])) {
      return secondHand;
    }
  }
  return firstHand; // default to first hand but shouldn't get here
}

export function orderHands(hands: string[]): string[] {
  // The list of hands in order to return
  const orderedHands: string[] = [];
  // Map of hand to numeric value
  const handMapping: { [key: string]: number } = {};
  const handTypeMapping: { [key in HAND_TYPE]: number } = {
    FiveOAK: 7,
    FourOAK: 6,
    FH: 5,
    ThreeOAK: 4,
    TP: 3,
    OP: 2,
    HC: 1,
  };

  const insertHandIntoOrderedList = (
    hand: string,
    indexOfFirstHigherHand: number,
    highestHandSameAsCurrent: boolean
  ) => {
    let handBeforeIndex = indexOfFirstHigherHand - 1;
    let handBefore = orderedHands[handBeforeIndex];
    // If the previous hand is not the same value just add
    if (
      !highestHandSameAsCurrent &&
      (!handBefore || handMapping[handBefore] !== handMapping[hand])
    ) {
    //   console.log("Adding ", hand);
      orderedHands.splice(indexOfFirstHigherHand, 0, hand);
    } else {
      // If they are the same then we need to do a second calculation
      // While hand before is same as current and tie breakwinner is the hand before
      handBeforeIndex = highestHandSameAsCurrent
        ? orderedHands.length - 1
        : handBeforeIndex;
      handBefore = orderedHands[handBeforeIndex];
      let tieBreakWinner = getTieBreakWinner(hand, handBefore);
      while (
        handBefore &&
        handMapping[handBefore] === handMapping[hand] &&
        tieBreakWinner === handBefore
      ) {
        handBeforeIndex--;
        handBefore = orderedHands[handBeforeIndex];
        if (handBefore) {
          tieBreakWinner = getTieBreakWinner(hand, handBefore);
        }
      }
    //   console.log("Adding ", hand);
      orderedHands.splice(handBeforeIndex + 1, 0, hand);
    }
  };

  hands.forEach((hand) => {
    const handType = getHandType(hand);
    const highestHandSameAsCurrent =
      orderedHands.length > 0 &&
      handMapping[orderedHands[orderedHands.length - 1]] ===
        handTypeMapping[handType];
    handMapping[hand] = handTypeMapping[handType];
    // find the first hand that's a higher value than the current
    const indexOfFirstHigherHand = highestHandSameAsCurrent
      ? -1
      : orderedHands.findIndex(
          (h) => handMapping[h] > handTypeMapping[handType]
        );
    if (indexOfFirstHigherHand < 0 && !highestHandSameAsCurrent) {
      // If there isn't one AND the last hand is not the same as the current
      // just push it to the end of the list
    //   console.log("Adding ", hand);
      orderedHands.push(hand);
    } else {
      // If the same or one higher
      insertHandIntoOrderedList(
        hand,
        indexOfFirstHigherHand,
        highestHandSameAsCurrent
      );
    }
  });
  return orderedHands;
}
