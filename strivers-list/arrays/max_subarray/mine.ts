// also known as kadane's-algorithm

import helpers from "../../../utils/helpers";

const TESTS = {
  case1: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
  case2: [1],
  case3: [5, 4, -1, 7, 8],
  case4: [-5], // -5
  case5: [-1, -2, -3], // -1
  case6: [-8, -3, -10, -2], // -2
  case7: [1, 2, 3, 4], // 10
  case8: [5, 1, 5, 2], // 13
  case9: [0, 0, 0], // 0
  case10: [0, -1, 0, -2, 0], // 0
  case11: [-100, 50, 60], // 110
  case12: [50, -150, 200], // 200
  case13: [-5, 4, 3, -2, 5, -1], // 10
  case14: [-1, 2, 3, -4, 10], // 10
  case16: [2, 2, -1, 2, 2], // 7
  case17: [1, 2, -1, 3, -2, 4], // 7
  case18: [3, -2, 5, -1, 6, -10, 4], // 11
};

function maxSubArray(nums: number[]) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

function main() {
  for (const input of Object.values(TESTS)) {
    const answer = maxSubArray(input);
    console.log(
      helpers.formatAnswer(JSON.stringify(answer), JSON.stringify(input))
    );
  }
}

main();
