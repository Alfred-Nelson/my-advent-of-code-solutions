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

function aoc_2_1(input: string = test_input) {
  const inputArr = formatInputToArr(input);
  let safeCount = 0;

  for (let row of inputArr) {
    const diffArr: number[] = [];
    for (let num = 1; num < row.length; num++) {
      diffArr.push(row[num] - row[num - 1]);
    }
    const eitherAscOrDsc =
      diffArr.every((each) => each > 0) || diffArr.every((each) => each < 0);
    const hasValidDiff = diffArr.every((each) => Math.abs(each) <= 3);

    // console.log("----------------------\n");
    // console.log("row          = ", row, "\n");
    // console.log("diffarr      = ", diffArr, "\n");
    // console.log("hasValidDiff = ", hasValidDiff, "\n");
    // console.log("AscOrDsc     = ", eitherAscOrDsc, "\n");
    // console.log("----------------------\n");

    if (eitherAscOrDsc && hasValidDiff) {
      safeCount++;
    }
  }

  return safeCount;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_2_1);

console.log(helpers.formatAnswer(answer));
