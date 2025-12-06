import helpers from "../../utils/helpers";

const TEST_INPUT = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

type CommandRecordType =
  | {
      identifier: "do" | "don't";
      idx: number;
    }
  | {
      identifier: "mul";
      idx: number;
      values: [number, number];
    };

function aoc_3_1(input: string = TEST_INPUT) {
  const mulCommandRegex = /mul\((\d+),(\d+)\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  let commands: CommandRecordType[] = [];
  let match: RegExpExecArray | null;
  let sum = 0;
  let executionEnabled = true;

  while ((match = mulCommandRegex.exec(input)) !== null) {
    const command: CommandRecordType = {
      identifier: "mul",
      idx: match.index,
      values: [parseInt(match[1]), parseInt(match[2])],
    };
    commands.push(command);
  }
  while ((match = doRegex.exec(input)) !== null) {
    const command: CommandRecordType = {
      identifier: "do",
      idx: match.index,
    };
    commands.push(command);
  }
  while ((match = dontRegex.exec(input)) !== null) {
    const command: CommandRecordType = {
      identifier: "don't",
      idx: match.index,
    };
    commands.push(command);
  }

  commands.sort((a, b) => a.idx - b.idx);

  for (let command of commands) {
    if (command.identifier === "don't") {
      executionEnabled = false;
    } else if (command.identifier === "do") {
      executionEnabled = true;
    } else if (executionEnabled && command.identifier === "mul") {
      sum += command.values[0] * command.values[1];
    }
  }

  return sum;
}

const executor = await helpers.makeExecutorWithInput();
const answer = executor(aoc_3_1);

console.log(helpers.formatAnswer(answer));
