// QUESTION:
// Given an m x n integer matrix matrix,
// if an element is 0,
// set its entire row and column to 0's.
// You must do it in place.

import helpers from "../../../utils/helpers";

const TESTS = {
  case1: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  case2: [
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ],
};

function setZeroes(matrix: number[][]) {
  const rows: number[] = [];
  const cols: number[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 0) {
        rows.push(i);
        cols.push(j);
      }
    }
  }

  for (let row of rows) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[row][j] = 0;
    }
  }

  for (let col of cols) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][col] = 0;
    }
  }
}

function main() {
  for (let input of Object.values(TESTS)) {
    const inputCopy = structuredClone(input);
    setZeroes(input);
    console.log(
      helpers.formatAnswer(JSON.stringify(input), JSON.stringify(inputCopy))
    );
  }
}

main();

export {};
