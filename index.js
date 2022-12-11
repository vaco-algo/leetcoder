const ProblemService = require("./services/problem");

async function upload() {
  const problemService = new ProblemService();

  await problemService.checkProblemUrl();
  await problemService.getProblemCode();
  await problemService.generateProblemFile();
}

module.exports = upload;
