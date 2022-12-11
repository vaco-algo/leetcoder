const commander = require("commander");
const package = require("../package.json");
const upload = require("../index");

const program = new commander.Command();

program
  .name(package.name)
  .action(upload)
  .parse(process.argv);
