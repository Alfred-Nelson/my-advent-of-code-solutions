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

function aoc_1_2(input: string = someOtherInput) {
  const [first, second] = formatStringInputToArray(input);

  const secondListCountMap = second.reduce(
    (acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }),
    {}
  );

  const answer = first.reduce((acc, cur) => {
    const newVal = (secondListCountMap[cur] || 0) * cur;
    return acc + newVal;
  }, 0);

  return helpers.formatAnswer(answer);
}

const executor = await helpers.makeExecutorWithInput();

console.log(executor(aoc_1_2));

export {};
