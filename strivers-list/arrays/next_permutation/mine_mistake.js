// QUESTION
// A permutation of an array of integers is an
// arrangement of its members into a sequence or linear order.
// The next permutation of an array of integers is the next
// lexicographically greater permutation of its integer.
// More formally, if all the permutations of the array are sorted
// in one container according to their lexicographical order,
// then the next permutation of that array is the permutation
// that follows it in the sorted container.
// If such arrangement is not possible, the array must be rearranged
//  as the lowest possible order (i.e., sorted in ascending order).

// ! MISTAKE - not in place ... took time to read that

import helpers from "../../../utils/helpers";

const TESTS = {
  case1: [1, 2, 3],
  case2: [3, 2, 1],
  case3: [1, 1, 5],
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const lastOnesArr = [];
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] < nums[i - 1]) {
      lastOnesArr.push(nums[i]);
      lastOnesArr.push(nums[i - 1]);
      continue;
    }
    const changeIdx = i - 1;
    lastOnesArr.push(nums[i - 1]);
    lastOnesArr.push(nums[i]);
    for (const [idx, val] of lastOnesArr.entries()) {
      if (val > nums[changeIdx]) {
        const returnable = [
          ...nums.slice(0, changeIdx),
          val,
          ...lastOnesArr.slice(0, idx),
          ...lastOnesArr.slice(idx + 1),
        ];
        return returnable;
      }
    }
  }

  const reversedArr = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    reversedArr.push(nums[i]);
  }
  return reversedArr;
};

function main() {
  for (let input of Object.values(TESTS)) {
    const clonedInput = structuredClone(input);
    console.log(
      helpers.formatAnswer(
        JSON.stringify(nextPermutation(input)),
        JSON.stringify(clonedInput)
      )
    );
  }
  //   const input = TESTS.case1;
  //   console.log(helpers.formatAnswer(nextPermutation(input), input));
}

main();
