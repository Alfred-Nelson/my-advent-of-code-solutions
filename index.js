import chalk from "yoctocolors";
import { intro, outro } from "@clack/prompts";
import ProjectProcess from "./utils/projectProcess";
import helpers from "./utils/helpers";

const wrapperColor = (message) =>
  chalk.bgCyanBright(chalk.bold(" " + message + " "));

intro(wrapperColor("Advent of Code TS/JS Solutions"));

let year, day, challenge;

year = await helpers.makeSelect({
  question: "Choose Year :",
  filterCondition: (item) => item.isDirectory() && item.name.includes("aoc"),
});

if (!!year?.name) {
  day = await helpers.makeSelect({
    question: "Choose Day :",
    path: year.parentPath + "/" + year.name,
    filterCondition: (item) => item.isDirectory() && item.name.includes("day"),
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

const challengeRunner = new ProjectProcess({
  command,
  projectName: challengeName,
});
challengeRunner.onClose(() => {
  outro(wrapperColor("Make Progress Each Day"));
});
