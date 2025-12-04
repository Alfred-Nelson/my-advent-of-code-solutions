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

function isSafeWithRemoval(arr: number[]): boolean {
  if (isSafe(arr)) return true;

  for (let i = 0; i < arr.length; i++) {
    const copy = arr.slice(0, i).concat(arr.slice(i + 1));
    if (isSafe(copy)) return true;
  }
  return false;
}

function aoc_2_2(input: string = test_input) {
  const arrList = formatInputToArr(input);
  let safeCount = 0;
  for (let row of arrList) {
    if (isSafeWithRemoval(row)) {
      safeCount++;
    }
  }

  return safeCount;
}

// // The below code is my solution.
// // I have written my solution in a
// // very over-engineered and over complicated manner.
// // My mistakes was that I assumed many things where
// // simple brute force is not at all expensive.

// // following is the psuedo-code for understanding the logic
// // 1. for cases where it is directly safe - without removal
// //    1.1. check for safety for each row
// //         1.1.a. find the consecutive numbers difference
// //           and store it in array
// //         1.1.b. if all are either +ve or -ve then
// //          the direction is fine
// //         1.1.c. if all values are less than 3 then
// //         ---- if both the above conditions are met then
// //              that row is safe
// // 2. for the case of one removal and safe:
// //    2.1. I will get the indexes of values that deviate
// //         from the safe condition.
// //         2.1.a. from the difference array I find the most
// //                followed direction (asc or desc) by finding
// //                the sum of difference array - and if the value
// //                is negative then it is in desc else asc
// //         2.1.b. if any abs value in the diff array is greater
// //                than 3 then it is a deviation
// //         2.1.c. since the deviation in the diff array means that
// //                the culprit can be i and i + 1 in the real array...
// //                I add them both to the deviation
// //    2.2. when I get the deviations I check
// //         2.2.a if there are no deviations it is completely safe
// //         2.2.b. if there are 2 deviations that means, removing one
// //                of them can possibly make it safe ...
// //               so I run safety check for that both condition
// //         2.2.c. if there are 3 deviations and all the 3 are
// //                consecutive then removing the center one could
// //                possibly make it safe

// // I have created many rules for the solution:
// // - consecutive deviation rule
// // - 2 deviation rule
// // - 3 deviation rule
// // - sum-based direction
// // - hasHighDiff
// // - same direction mismatch
// // - recursive testing
// // This is a sign that the logic is becoming fragile.
// // If input size < 1000 → brute force is acceptable.
// // This eliminates the need for clever heuristics.
// // and Prefer verification over prediction

// // * The simplest correct solution is usually best. - Occam's razor
// // * Occam's razor indicates that the simplest explanation —
// // * that is, the solution that requires the fewest assumptions —
// // * is preferable.

// function getDiffArr(arr: number[]) {
//   const diffArr: number[] = [];
//   for (let num = 1; num < arr.length; num++) {
//     diffArr.push(arr[num] - arr[num - 1]);
//   }
//   return diffArr;
// }

// function getOneValSplicedArr(arr: number[], idx: number) {
//   return ([] as number[]).concat(...arr.slice(0, idx), ...arr.slice(idx + 1));
// }

// function getDeviations(diffArr: number[]) {
//   const diffArrSum = diffArr.reduce((acc, cur) => acc + cur, 0);
//   let mainDir = diffArrSum > 0 ? "asc" : diffArrSum < 0 ? "desc" : "same";
//   let deviations = diffArr.reduce((acc, cur, idx) => {
//     const isNotInDesc = mainDir === "desc" && !(cur < 0);
//     const isNotInAsc = mainDir === "asc" && !(cur > 0);
//     const isSameDiff = cur === 0;
//     const isSame = mainDir === "same";
//     const hasHighDiff = Math.abs(cur) > 3;

//     if (isNotInAsc || isNotInDesc || isSame || hasHighDiff || isSameDiff) {
//       acc.add(idx);
//       acc.add(idx + 1);
//     }
//     return acc;
//   }, new Set<number>());

//   return new Array<number>(...deviations);
// }

// function checkValid(
//   diffArr: number[],
//   realArr: number[],
//   tolerated: boolean = false
// ) {
//   const deviations = getDeviations(diffArr);
//   let isConsecutive = true;
//   for (let i = 1; i < diffArr.length; i++) {
//     const diff = deviations[i] - deviations[i - 1];
//     if (isConsecutive && diff !== 1) {
//       isConsecutive = false;
//     }
//   }

//   if (!deviations.length) return true;
//   else if (tolerated && !!deviations.length) return false;
//   else if (deviations.length > 3) return false;
//   else if (deviations.length === 3) {
//     const tArr = getOneValSplicedArr(realArr, deviations[1]);
//     const diffTArr = getDiffArr(tArr);
//     return checkValid(diffTArr, tArr, true);
//   } else if (deviations.length === 2) {
//     const validArr = deviations.map((each) => {
//       const tArr = getOneValSplicedArr(realArr, each);
//       const diffTArr = getDiffArr(tArr);
//       return checkValid(diffTArr, tArr, true);
//     });
//     return validArr.some(Boolean);
//   }

//   return false;
// }

// function aoc_2_2(input: string = test_input) {
//   const inputArr = formatInputToArr(input);
//   let safeCount = 0;

//   for (let row of inputArr) {
//     const diffArr = getDiffArr(row);
//     if (checkValid(diffArr, row)) {
//       safeCount++;
//     }
//   }

//   return safeCount;
// }

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_2_2);

console.log(helpers.formatAnswer(answer));
