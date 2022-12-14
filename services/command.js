const execa = require("execa");
const seperate = require("../utils/seperate");

class Command {
  constructor() {
    this.path = null;
    this.queue = Promise.resolve();
  }

  setPath(path) {
    this.chain(async () => {
      this.path = path;
    });

    return this;
  }

  run(commandText) {
    const [command, ...args] = seperate(commandText);

    this.chain(async () => {
      await execa(command, args, {
        cwd: this.path,
        stdio: "inherit"
      });
    });

    return this;
  }


  then(callback) {
    callback(this.queue);
  }

  chain(callback) {
    return this.queue = this.queue.then(callback);
  }
}

module.exports = Command;
