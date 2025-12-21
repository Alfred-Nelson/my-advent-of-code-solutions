import chalk from "yoctocolors";
import { intro, outro, select } from "@clack/prompts";
import ProjectProcess from "./utils/projectProcess";
import helpers from "./utils/helpers";

const IGNORE_LIST = ["node_modules", "utils", "input.txt", ".git"];

const wrapperColor = (message) =>
  chalk.bgCyanBright(chalk.bold(" " + message + " "));

async function genericSelector() {
  let iteration = 1;
  let path = ".";

  while (!path.endsWith(".ts") && !path.endsWith(".js")) {
    const filterCondition = (dir) => {
      const isNotIgnored = !IGNORE_LIST.some(
        (ignore) => dir.name.includes(ignore) || dir.name.includes("aoc")
      );
      if (iteration === 1) {
        return dir.isDirectory() && isNotIgnored;
      }
      return isNotIgnored;
    };

    const selected = await helpers.makeSelect({
      path,
      filterCondition,
      labelFormatter: (dir) => dir.name,
    });

    path = selected.parentPath + "/" + selected.name;
    iteration++;
  }

  const command = "tsx " + path;

  return { command, projectName: "challenge" };
}

async function aocSelector() {
  let year, day, challenge;

  year = await helpers.makeSelect({
    question: "Choose Year :",
    filterCondition: (item) => item.isDirectory() && item.name.includes("aoc"),
  });

  if (!!year?.name) {
    day = await helpers.makeSelect({
      question: "Choose Day :",
      path: year.parentPath + "/" + year.name,
      filterCondition: (item) =>
        item.isDirectory() && item.name.includes("day"),
    });
  }

  if (!!day?.name) {
    challenge = await helpers.makeSelect({
      question: "Choose Challenge :",
      path: day.parentPath + "/" + day.name,
      filterCondition: (item) =>
        !item.isDirectory() && item.name.includes("challenge"),
    });
  }
  const challengePath = challenge.parentPath + "/" + challenge.name;
  const command = "tsx " + challengePath;
  const challengeName = challenge.name.split(".")[0];

  return { command, projectName: challengeName };
}

//   const challengePath = challenge.parentPath + "/" + challenge.name;
//   const command = "tsx " + challengePath;
//   const challengeName = challenge.name.split(".")[0];
// }

async function main() {
  intro(wrapperColor("Code the day"));
  const selection = await select({
    message: "what solution should I show you ?",
    options: [
      { label: "aoc", value: "aoc" },
      { label: "other", value: "other" },
    ],
  });
  const processConfig = await (selection === "aoc"
    ? aocSelector()
    : genericSelector());
  const challengeRunner = new ProjectProcess(processConfig);
  challengeRunner.onClose(() => {
    outro(wrapperColor("Make Progress Each Day"));
  });
}

await main();
