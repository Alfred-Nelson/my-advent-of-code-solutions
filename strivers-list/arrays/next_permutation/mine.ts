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

import helpers from "../../../utils/helpers";

const TESTS = {
  case1: [1, 2, 3],
  case2: [3, 2, 1],
  case3: [1, 1, 5],
};

function nextPermutation(nums: number[]) {
  // find pivot
  let pivot: number = -1;
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i - 1] < nums[i]) {
      pivot = i - 1;
      break;
    }
  }

  if (pivot === -1) {
    nums.reverse();
    return;
  }

  // find value index which is just greater than pivot
  let swapIdx: number = -1;
  for (let i = nums.length - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      swapIdx = i;
      break;
    }
  }

  // swap the found and pivot
  [nums[swapIdx], nums[pivot]] = [nums[pivot], nums[swapIdx]];

  // reverse suffix
  // suffix: list of numbers after pivot, will always be in desc order
  const [suffixMin, suffixMax] = [pivot + 1, nums.length - 1];
  for (let i = suffixMin, j = suffixMax; i < j; i++, j--) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
}

function main() {
  for (let input of Object.values(TESTS)) {
    const clonedInput = structuredClone(input);
    nextPermutation(input);
    console.log(
      helpers.formatAnswer(JSON.stringify(input), JSON.stringify(clonedInput))
    );
  }
}

main();
