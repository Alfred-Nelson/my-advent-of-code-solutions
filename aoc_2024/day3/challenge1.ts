import helpers from "../../utils/helpers";

const TEST_INPUT = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

function aoc_3_1(input: string = TEST_INPUT) {
  const regex = /mul\((\d+),(\d+)\)/g;

  let sum = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    const a = Number(match[1]);
    const b = Number(match[2]);
    sum += a * b;
  }
  return sum;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_3_1);

console.log(helpers.formatAnswer(answer));
