const ProblemService = require("./services/problem");

async function upload() {
  const problemService = new ProblemService();

  await problemService.checkUrl();
}

module.exports = upload;
