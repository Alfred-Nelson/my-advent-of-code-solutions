import helpers from "../../utils/helpers";
import chalk from "yoctocolors";

const TEST_INPUT = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const WORD = "XMAS";

function formatInputToArr(input: string) {
  return input
    .split("\n")
    .map((row) => row.split("").filter(Boolean))
    .filter((each) => !!each.length);
}

function findHCF(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);

  while (a !== b) {
    if (a > b) {
      a -= b;
    } else {
      b -= a;
    }
  }
  return a;
}

function getAllPossibleDirections(
  arr: string[][],
  rowIdx: number,
  colIdx: number
) {
  const halfLength = arr[0].length / 2;
  const possibleDirections: number[][] = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr[i].length; j++) {
      const tRowIdx = rowIdx + j;
      const tColIdx = colIdx + i;
      const x = i - rowIdx;
      const y = j - colIdx;
      const cf = findHCF(x, y);
      if (cf === 1 || cf == x || cf === 0) continue;
      if (arr[tRowIdx]?.[tColIdx] === undefined) continue;
      if (arr[tRowIdx][tColIdx] === WORD[1]) {
        possibleDirections.push([j, i]);
      }
    }
  }
  return possibleDirections;
}

function isValidDirection(
  arr: string[][],
  rowIdx: number,
  colIdx: number,
  direction: number[]
) {
  const coords: number[][] = [];
  for (let i = 0; i < WORD.length; i++) {
    const tRowIdx = rowIdx + direction[0] * i;
    const tColIdx = colIdx + direction[1] * i;

    if (arr[tRowIdx]?.[tColIdx] !== WORD[i]) return { isValid: false };
    coords.push([tRowIdx, tColIdx]);
  }

  return { isValid: true, coords };
}

function getCountOfTheWordInAllDirection(
  arr: string[][],
  rowIdx: number,
  colIdx: number
) {
  const allPossibleDirectons = getAllPossibleDirections(arr, rowIdx, colIdx);
  const returnable = allPossibleDirectons.reduce(
    (acc, cur) => {
      const { isValid, coords } = isValidDirection(arr, rowIdx, colIdx, cur);
      if (isValid) {
        acc.count++;
        acc.coords.push(...(coords as number[][]));
      }
      return acc;
    },
    { count: 0, coords: [] as number[][] }
  );

  return returnable;
}

function isInCoords(coords: number[][], i: number, j: number) {
  return coords.some(([x, y]) => x === i && y === j);
}

function printCoords(arr: string[][], coords: number[][]) {
  for (let i = 0; i < arr.length; i++) {
    const row: string[] = [];
    for (let j = 0; j < arr[i].length; j++) {
      if (isInCoords(coords, i, j)) {
        if (arr[i][j] === "X") {
          row.push(chalk.red(arr[i][j]));
        } else {
          row.push(chalk.green(arr[i][j]));
        }
        continue;
      }
      row.push(chalk.gray(" "));
    }
    console.log(row.join(" "));
  }
}

function aoc_4_2(input: string = TEST_INPUT) {
  const arr = formatInputToArr(input);
  let count = 0;
  const coords: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === WORD[0]) {
        const { coords: tCoords, count: val } = getCountOfTheWordInAllDirection(
          arr,
          i,
          j
        );
        count += val;
        coords.push(...tCoords);
      }
    }
  }

  //   printCoords(arr, coords);

  for (let i = 0; i < 9; i++) {
    const x: string[] = [];
    for (let j = 0; j < 9; j++) {
      x.push(
        [i, j]
          .map((each) => String(Math.abs(each - 4)).padStart(2, "0"))
          .join("")
      );
    }
    console.log(x.join("   ") + "\n\n");
  }

  return count;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_4_2);
console.log(helpers.formatAnswer(answer));
