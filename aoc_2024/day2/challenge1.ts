import helpers from "../../utils/helpers";

const test_input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

function formatInputToArr(input: string) {
  return input
    .split("\n")
    .map((row) =>
      row
        .split(" ")
        .filter(Boolean)
        .map((num) => parseInt(num))
    )
    .filter((each) => !!each.length);
}

function getDiffArr(arr: number[]) {
  const diffArr: number[] = [];
  for (let num = 1; num < arr.length; num++) {
    diffArr.push(arr[num] - arr[num - 1]);
  }
  return diffArr;
}

function isSafe(arr: number[]) {
  const diffArr = getDiffArr(arr);
  const allAsc = diffArr.every((each) => each > 0);
  const allDesc = diffArr.every((each) => each < 0);
  const eitherAscOrDsc = allAsc || allDesc;
  const hasValidDiff = diffArr.every((each) => Math.abs(each) <= 3);

  return eitherAscOrDsc && hasValidDiff;
}

function aoc_2_1(input: string = test_input) {
  const inputArr = formatInputToArr(input);
  let safeCount = 0;

  for (let row of inputArr) {
    if (isSafe(row)) {
      safeCount++;
    }
  }

  return safeCount;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_2_1);

console.log(helpers.formatAnswer(answer));
