import helpers from "../utils/helpers";

function getPermutations(arr: number[]): number[][] {
  // Step 1: Sort the array first
  arr.sort((a, b) => a - b);

  const result: number[][] = [];

  while (true) {
    // Store current permutation
    result.push([...arr]);

    // Step 2: Find the largest index i such that arr[i] < arr[i + 1]
    let i: number = arr.length - 2;
    while (i >= 0 && arr[i] >= arr[i + 1]) {
      i--;
    }

    // If no such index exists, we are done
    if (i < 0) break;

    // Step 3: Find the largest index j such that arr[j] > arr[i]
    let j: number = arr.length - 1;
    while (arr[j] <= arr[i]) {
      j--;
    }

    // Step 4: Swap arr[i] and arr[j]
    [arr[i], arr[j]] = [arr[j], arr[i]];

    // Step 5: Reverse the elements after index i
    let left: number = i + 1;
    let right: number = arr.length - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return result;
}

// Example usage
const nums: number[] = [1, 2, 3];
console.log(
  helpers.formatAnswer(
    JSON.stringify(getPermutations(nums)),
    JSON.stringify(nums)
  )
);
