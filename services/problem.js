const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const sleep = require("../utils/sleep");
const ora = require("ora");

class ProblemService {
  constructor() {
    this.leetcodeUrl = null;
    this.fileCode = null;
  }

  async checkProblemUrl() {
    while (!this.leetcodeUrl) {
      const { leetcodeUrl } = await inquirer.prompt({
        type: "input",
        name: "leetcodeUrl",
        message: "leetcode url을 입력해주세요.",
        when: !this.leetcodeUrl,
      });

      this.leetcodeUrl = leetcodeUrl;
    }
  }

  async getProblemCode() {
    const spinner = ora("leetcode에서 code 정보를 가져오는 중입니다!").start();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(this.leetcodeUrl);

    const listBoxButtonSelector = "#headlessui-listbox-button-13";
    await page.waitForSelector(listBoxButtonSelector);
    await page.click(listBoxButtonSelector);

    const javascriptButtonSelector = "#headlessui-listbox-option-21";
    await page.waitForSelector(javascriptButtonSelector);
    await page.click(javascriptButtonSelector);

    await sleep(1000);

    const editorSelector = ".view-lines.monaco-mouse-cursor-text";
    await page.waitForSelector(editorSelector);
    const editorHandle = await page.$(editorSelector);
    const code = await page.evaluate(editorHandle => editorHandle.textContent, editorHandle);

    this.fileCode = code;

    await browser.close();

    spinner.succeed("성공적으로 완료되었습니다.");
  }
}

module.exports = ProblemService;
