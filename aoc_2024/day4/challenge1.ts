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

const wr = 0;
const wc = 5;
const wx = 1;
const wy = 0;

function formatInputToArr(input: string) {
  return input
    .split("\n")
    .map((row) => row.split("").filter(Boolean))
    .filter((each) => !!each.length);
}

// The below commented code is for finding all the direction directly
// accessible not just in single direction 45deg box. it uses HCF to
// calculate the direct distance -> if hcf = 1 then it is reachable
// through a direct line
//
// function findHCF(a: number, b: number) {
//   a = Math.abs(a);
//   b = Math.abs(b);

//   while (b !== 0) {
//     const temp = b;
//     b = a % b;
//     a = temp;
//   }

//   return a;
// }

// function getViableDirections(
//   arr: string[][],
//   rowIdx: number,
//   colIdx: number
// ) {
//   const possibleDirections: number[][] = [];

//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr[0].length; j++) {
//       const y = i - rowIdx;
//       const x = j - colIdx;
//       const cf = findHCF(x, y);
//       if (cf === 1) {
//         if (arr[i][j] === WORD[1]) {
//           possibleDirections.push([x, y]);
//         }
//       }
//     }
//   }
//   return possibleDirections;
// }

function getViableDirections(arr: string[][], rowIdx: number, colIdx: number) {
  const possibleDirections: number[][] = [];
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const i = dy + rowIdx;
      const j = dx + colIdx;
      if (arr[i]?.[j] === undefined) continue;
      if (dx === 0 && dy === 0) continue;
      if (arr[i][j] === WORD[1]) {
        possibleDirections.push([dx, dy]);
      }
    }
  }
  return possibleDirections;
}

function matchWordInDirection(
  arr: string[][],
  rowIdx: number,
  colIdx: number,
  direction: number[]
) {
  const coords: number[][] = [];
  for (let i = 0; i < WORD.length; i++) {
    const [dx, dy] = direction;
    const tRowIdx = rowIdx + dy * i;
    const tColIdx = colIdx + dx * i;
    if (arr[tRowIdx]?.[tColIdx] !== WORD[i]) return { isValid: false };
    coords.push([tRowIdx, tColIdx]);
  }

  return { isValid: true, coords };
}

function scanDirectionsForWord(
  arr: string[][],
  rowIdx: number,
  colIdx: number
) {
  const viableDirections = getViableDirections(arr, rowIdx, colIdx);
  const directionData = {
    count: 0,
    coords: [] as number[][],
    directions: [] as number[][],
  };

  for (let i = 0; i < viableDirections.length; i++) {
    const dir = viableDirections[i];
    const { isValid, coords } = matchWordInDirection(arr, rowIdx, colIdx, dir);
    if (isValid) {
      directionData.count++;
      directionData.coords.push(...(coords as number[][]));
      directionData.directions.push(dir);
    }
  }

  return directionData;
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

function aoc_4_1(input: string = TEST_INPUT) {
  const arr = formatInputToArr(input);
  let count = 0;
  const coords: number[][] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === WORD[0]) {
        const { coords: tCoords, count: val } = scanDirectionsForWord(
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

  return count;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_4_1);
console.log(helpers.formatAnswer(answer));
