import helpers from "../../utils/helpers";

const TEST_INPUT = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

function formatInputToArr(input: string) {
  return input
    .split("\n")
    .map((row) => row.split("").filter(Boolean))
    .filter((each) => !!each.length);
}

function scanForACoords(arr: string[][]) {
  const listOfA: [number, number][] = [];
  for (let i = 1; i < arr.length - 1; i++) {
    for (let j = 1; j < arr[0].length - 1; j++) {
      if (arr[i][j] === "A") listOfA.push([i, j]);
    }
  }

  return listOfA;
}

function xmasScanner(arr: string[][], listOfA: [number, number][]) {
  let count = 0;
  for (let [i, j] of listOfA) {
    const centerVal = arr[i][j];
    const tlVal = arr[i - 1][j - 1];
    const trVal = arr[i + 1][j - 1];
    const blVal = arr[i - 1][j + 1];
    const brVal = arr[i + 1][j + 1];

    const diagonals = [tlVal + centerVal + brVal, trVal + centerVal + blVal];

    const isXmas = diagonals.every(
      (diagonal) => diagonal === "SAM" || diagonal === "MAS"
    );
    if (isXmas) count++;
  }

  return count;
}

function aoc_4_2(input: string = TEST_INPUT) {
  const arr = formatInputToArr(input);
  const listOfA = scanForACoords(arr);
  const xmasCount = xmasScanner(arr, listOfA);

  return xmasCount;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_4_2);
console.log(helpers.formatAnswer(answer));
