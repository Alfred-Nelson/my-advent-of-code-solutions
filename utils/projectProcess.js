import spawn from "cross-spawn";
import crypto from "node:crypto";
import chalk from "yoctocolors";

/**
 * @typedef {Object} ProcessCreatorPropType
 * @property {string} command
 * @property {string} [projectName]
 */

class ProjectProcess {
  /**
   * @type {Map<"stderr.data" | "stdout.data" | ".close", Function>}
   */
  #listeners = new Map();

  /**
   * @param {ProcessCreatorPropType} props
   */
  constructor({ command = "", projectName = "", inheritStdIO = true }) {
    try {
      const extractedFirstCommand = command.split(/[&|]/)[0];
      if (!command) {
        throw new Error("kindly provide a valid command");
      }
      if (!extractedFirstCommand) {
        throw new Error("kindly provide a valid command");
      }

      this.process = inheritStdIO
        ? spawn("npx", extractedFirstCommand.split(" "), {
            stdio: "inherit",
          })
        : spawn("npx", extractedFirstCommand.split(" "));
      this.projectName = projectName || crypto.randomUUID();
    } catch (e) {
      throw e;
    }
  }

  activateLogs() {
    function logStdErr(error) {
      if (error.toString().trim() === "") return;
      if (error.toString().includes("npm warn")) {
        console.log(chalk.yellow(error.toString()));
        return;
      }
      console.log(chalk.bgRed(chalk.bold(`${this.projectName} Err:`)));
      console.log(error.toString());
    }

    function logStdOut(data) {
      if (data.toString().trim() === "") return;
      console.log(chalk.green(chalk.bold(`${this.projectName} Out:`)));
      console.log(data.toString());
    }

    try {
      const stdErrListener = logStdErr.bind(this);
      const stdOutListener = logStdOut.bind(this);

      this.#listeners.set("stderr.data", stdErrListener);
      this.#listeners.set("stdout.data", stdOutListener);
      this.process.stderr.on("data", stdErrListener);
      this.process.stdout.on("data", stdOutListener);
    } catch (e) {
      throw e;
    }
  }

  onClose(callback) {
    try {
      this.#listeners.set(".close", callback);
      this.process.on("close", callback);
    } catch (e) {
      throw e;
    }
  }

  cleanup() {
    let eventSeq = this.#listeners.keys().next();
    while (!eventSeq.done) {
      const [eventType, eventName] = eventSeq.value.split(".");
      const listener = this.#listeners.get(eventSeq.value);

      if (!!eventType)
        this.process[eventType].removeListener(eventName, listener);
      else this.process.removeListener(eventName, listener);

      eventSeq = this.#listeners.keys().next();
    }
  }

  checkAndKill() {
    if (!this.process.killed) this.process.kill();
  }
}

export default ProjectProcess;
