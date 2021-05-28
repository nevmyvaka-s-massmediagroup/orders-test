import React from "react";
import { stableSort, getComparator } from "./sortUtils";

const originalArray = [
  {
    name: "ab",
    age: 19,
    date: new Date("Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "xz",
    age: 26,
    date: new Date("Wed Jan 9 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 14,
    date: new Date("Wed Jan 10 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "cw",
    age: 22,
    date: new Date("Wed Jan 23 2021 00:00:00 GMT+0000 (GMT)"),
  },
];

const expectedArrayByName = [
  {
    name: "xz",
    age: 26,
    date: new Date("Wed Jan 9 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "cw",
    age: 22,
    date: new Date("Wed Jan 23 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 19,
    date: new Date("Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 14,
    date: new Date("Wed Jan 10 2021 00:00:00 GMT+0000 (GMT)"),
  },
];

const expectedArrayByNumbersAsc = [
  {
    name: "ab",
    age: 14,
    date: new Date("Wed Jan 10 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 19,
    date: new Date("Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "cw",
    age: 22,
    date: new Date("Wed Jan 23 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "xz",
    age: 26,
    date: new Date("Wed Jan 9 2021 00:00:00 GMT+0000 (GMT)"),
  },
];

const expectedArrayByDatesAsc = [
  {
    name: "xz",
    age: 26,
    date: new Date("Wed Jan 9 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 14,
    date: new Date("Wed Jan 10 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "ab",
    age: 19,
    date: new Date("Wed Jan 13 2021 00:00:00 GMT+0000 (GMT)"),
  },
  {
    name: "cw",
    age: 22,
    date: new Date("Wed Jan 23 2021 00:00:00 GMT+0000 (GMT)"),
  },
];

test("sort by desc", () => {
  const result = stableSort(originalArray, getComparator("desc", "name"));
  expect(result).toStrictEqual(expectedArrayByName);
});

test("sort by numbers asc", () => {
  const result = stableSort(originalArray, getComparator("asc", "age"));
  expect(result).toStrictEqual(expectedArrayByNumbersAsc);
});

test("sort by dates asc", () => {
  const result = stableSort(originalArray, getComparator("asc", "date"));
  expect(result).toStrictEqual(expectedArrayByDatesAsc);
});
