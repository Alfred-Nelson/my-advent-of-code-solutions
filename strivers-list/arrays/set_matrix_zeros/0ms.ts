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
  let m = matrix.length,
    n = matrix[0].length;

  let rows = new Array(m).fill(0);
  let cols = new Array(n).fill(0);

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      const val = matrix[row][col];
      if (val !== 0) continue;

      // val is 0
      rows[row] = "X";
      cols[col] = "X";
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rows[i] || cols[j]) {
        matrix[i][j] = 0;
      }
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
