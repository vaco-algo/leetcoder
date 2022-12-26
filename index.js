const fs = require("fs/promises");
const path = require("path");
const ora = require("ora");
const inquirer = require("inquirer");
const DatePrompt = require("inquirer-date-prompt");

const Command = require("./services/command");
const Leetcode = require("./services/leetcode");
const GITHUB = require("./config/github");
const dateFormatter = require("./utils/dateFormatter");
const install = require("./utils/install");

async function upload() {
  const problem = new Leetcode();

  inquirer.registerPrompt("date", DatePrompt);

  const { url } = await inquirer.prompt({
    type: "input",
    name: "url",
    message: "url을 입력해주세요: ",
    prefix: " 🖐️ ",
    validate: (url) => {
      if (!url.includes("https://leetcode.com/problems/")) {
        return "leetcode url이 아닙니다! url을 다시 입력해주세요";
      }

      return true;
    }
  });
  const { problemDate } = await inquirer.prompt({
    type: "date",
    name: "problemDate",
    message: "문제를 푸는 날짜는 언제인가요?",
    prefix: " 🗓️ ",
    default: new Date(),
    locale: "en-KR",
    format: {
      month: "short",
      hour: undefined,
      minute: undefined
    },
    validate: (date) => {
      if (date.toString() === "Invalid Date") {
        return "날짜를 다시 선택해주세요.";
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

    problem.fileName = `[${dateFormatter(problemDate)}] ${problem.title}.js`;

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

  try {
    await new Command()
      .setPath(process.cwd())
      .run(`git clone -b problems --single-branch ${GITHUB.ALGO_REPOSITORY_URL}`);

    await install(
      path.join(process.cwd(), "vaco-algo-study", "problems"),
      problem.fileName,
      problem.fileCode
    );

    console.log("문제 파일 생성을 완료하였습니다.");

    const { isPush } = await inquirer.prompt({
      type: "list",
      name: "isPush",
      message: "Github으로 push 하시겠습니까?",
      choices: ["Yes", "No"]
    });

    if (isPush !== "Yes" || !isPush) {
      throw new Error("exit");
    }

    await new Command()
      .setPath(path.join(process.cwd(), "vaco-algo-study"))
      .run(`git add .`)
      .run(`git commit -m "(auto upload) ${problem.title}"`)
      .run("git push origin problems");

    console.log("문제 업로드가 완료되었습니다.");
  } catch (error) {
    console.error(error);
  } finally {
    await fs.rm(
      path.join(process.cwd(), "vaco-algo-study"),
      { recursive: true }
    );
    return process.exit(1);
  }
}

module.exports = upload;
