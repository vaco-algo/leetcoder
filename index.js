const ProblemService = require("./services/problem");

async function upload() {
  const problemService = new ProblemService();

  await problemService.checkProblemUrl();
  await problemService.getProblemCode();
}

module.exports = upload;
