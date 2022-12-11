const inquirer = require("inquirer");

class ProblemService {
  constructor() {
    this.leetcodeUrl = null;
  }

  async checkUrl() {
    while (!this.leetcodeUrl) {
      const { leetcodeUrl } = await inquirer.prompt({
        type: "input",
        name: "leetcodeUrl",
        message: "leetcode url을 입력해주세요.",
        when: !this.leetcodeUrl,
      });

      this.leetcodeUrl = leetcodeUrl;
    }

    return this;
  }
}

module.exports = ProblemService;
