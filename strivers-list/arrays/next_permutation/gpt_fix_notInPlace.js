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

var nextPermutation = function (nums) {
  const n = nums.length;
  let pivot = -1;

  // 1. Find pivot
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }

  // 2. If no pivot, return reversed
  if (pivot === -1) {
    return [...nums].reverse();
  }

  // 3. Find smallest element greater than pivot
  let swapIdx = -1;
  for (let i = n - 1; i > pivot; i--) {
    if (nums[i] > nums[pivot]) {
      swapIdx = i;
      break;
    }
  }

  // 4. Build result
  const result = [...nums];
  [result[pivot], result[swapIdx]] = [result[swapIdx], result[pivot]];

  // 5. Reverse suffix
  const suffix = result.slice(pivot + 1).reverse();
  return [...result.slice(0, pivot + 1), ...suffix];
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
}

main();
