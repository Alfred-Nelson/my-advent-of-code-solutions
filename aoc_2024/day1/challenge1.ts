import helpers from "../../utils/helpers";

const someOtherInput = `3   4
  4   3
  2   5
  1   3
  3   9
  3   3\n`;
/**
 * "1  2/n3  4/n" => [[1, 3], [2, 4]]
 */
function formatStringInputToArray(input: string) {
  return input
    .split("\n")
    .slice(0, -1) // to remove last empty
    .reduce(
      (acc: [number[], number[]], cur) => {
        const curArr: number[] = cur
          .split(" ")
          .filter(Boolean)
          .map((each) => Number(each));
        acc[0].push(curArr[0]);
        acc[1].push(curArr[1]);
        return acc;
      },
      [[], []]
    );
}

function aoc_1_1(input: string = someOtherInput) {
  const [sortedFirst, sortedSecond] = formatStringInputToArray(input).map(
    (each) => each.sort()
  );

  const answer = sortedSecond.reduce((acc, _, idx) => {
    const difference = sortedSecond[idx] - sortedFirst[idx];
    return acc + Math.abs(difference);
  }, 0);

  return helpers.formatAnswer(answer);
}

const executor = await helpers.makeExecutorWithInput();

console.log(executor(aoc_1_1));

/**
 * TypeScript is treating the file as a script (global
 * scope) because it has no imports/exports, causing
 * duplicate declaration errors. Making it a module by
 * adding export {} at the end:
 */
export {};
