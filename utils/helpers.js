import * as fs from "node:fs/promises";
import { select } from "@clack/prompts";
import { Dirent } from "node:fs";

const helpers = {
  getCallerFilePath() {
    const original = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) =>
      stack.map((each) => each.getFileName());

    const err = new Error();
    const stack = err.stack;

    Error.prepareStackTrace = original;

    return stack
      .filter(
        (each) =>
          each.includes("day") &&
          each.includes("aoc") &&
          each.includes("challenge")
      )[0]
      .split("/")
      .slice(2, -1)
      .join("/");
  },

  /**
   * @typedef MakeSelectPropType
   * @property {string} question
   * @property {string} path
   * @property {(item: import("node:fs").Dirent) => boolean} filterCondition
   * @property {(item: import("node:fs").Dirent) => string} labelFormatter
   * @property {(item: import("node:fs").Dirent) => any} valueFormatter
   * @property {(item: import("node:fs").Dirent[]) => import("node:fs").Dirent[]} formatList
   */

  /**
   *
   * @param {MakeSelectPropType}
   */
  async makeSelect({
    question = "",
    path = ".",
    filterCondition = null,
    labelFormatter = (dir) => dir.name.replace(/\D/g, ""),
    valueFormatter = (dir) => dir,
    formatList = (dirList) => dirList.reverse(),
  }) {
    let list = await fs.readdir(path, { withFileTypes: true });
    let dirList = filterCondition ? list.filter(filterCondition) : list;
    dirList = formatList(dirList);

    return await select({
      message: question,
      options: dirList.map((dir) => ({
        label: labelFormatter(dir),
        value: valueFormatter(dir),
      })),
    });
  },

  async makeExecutorWithInput(promptQuestion = "select the input file") {
    /**
     *
     * @type {MakeSelectPropType["formatList"]}
     */
    function formatList(arr) {
      return arr
        .filter(
          (each) => each.name.includes("input") && each.name.endsWith(".txt")
        )
        .concat({ name: "default", parentPath: "" });
    }

    function formatOptionItem(dir) {
      return dir.parentPath + (!!dir.parentPath ? "/" : "") + dir.name;
    }

    const path = this.getCallerFilePath();
    const inputFile = await this.makeSelect({
      path,
      question: promptQuestion,
      formatList,
      valueFormatter: formatOptionItem,
      labelFormatter: formatOptionItem,
    });
    let input;

    if (inputFile !== "default") {
      input = await fs.readFile(inputFile, { encoding: "utf-8" });
      input = input.replaceAll("\\n", "\n");
    } else {
      input = undefined;
    }

    /**
     *
     * @param {Function} fn
     * @returns
     */
    function executor(fn) {
      return fn(input);
    }

    return executor;
  },

  /**
   *
   * @param {string | number} answer
   */
  formatAnswer(answer) {
    return "│\n│\n│ answer: " + answer + "\n│\n│";
  },
};

export default helpers;
