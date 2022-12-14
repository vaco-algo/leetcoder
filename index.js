const ora = require("ora");
const inquirer = require("inquirer");

const Leetcode = require("./services/leetcode");
const date = require("./utils/date");

async function upload() {
  const problem = new Leetcode();
  const { url } = await inquirer.prompt({
    type: "input",
    name: "url",
    message: "url을 입력해주세요: ",
    validate: (url) => {
      if (!url.includes("https://leetcode.com/problems/")) {
        return "leetcode url이 아닙니다! url을 다시 입력해주세요";
      }

      return true;
    }
  });
  const spinner = ora("leetcode에서 code 정보를 가져오는 중입니다!").start();

  try {
    await problem
      .open(url)
      .get("title")
      .clickLanguage("JavaScript")
      .sleep(1000)
      .get("editor")
      .close();

    problem.fileName = `[${date()}] ${problem.title}.js`;

    const fileCodeArray = problem.editor
      .split("\n")
      .map(code => code.includes("var") ? code.replaceAll("var", "const") : code);
    const remarkStartIndex = fileCodeArray.findIndex((textCode) => textCode === "/**");
    const remark = ` * leetcode problem link: ${url}`;
    const space = " *";

    fileCodeArray.splice(remarkStartIndex + 1, 0, remark, space);
    problem.fileCode = fileCodeArray.join("\n").concat("\n");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  spinner.succeed("성공적으로 완료되었습니다.");

  console.log();
  console.log(problem.fileName);
  console.log();
  console.log(problem.fileCode);
  console.log();
}

module.exports = upload;
