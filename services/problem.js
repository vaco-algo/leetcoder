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
        message: "leetcode url을 입력해주세요:",
        when: !this.leetcodeUrl,
      });

      this.leetcodeUrl = leetcodeUrl;
    }
  }

  async getProblemCode() {
    const listBoxButtonSelector = "#headlessui-listbox-button-10";
    const languageListSelector = "ul.absolute.mt-1.max-h-56.overflow-auto.rounded-lg.p-2.z-dropdown";
    const editorSelector = ".view-lines.monaco-mouse-cursor-text";
    const titleSelector = "span.mr-2.text-lg.font-medium.text-label-1";

    const spinner = ora("leetcode에서 code 정보를 가져오는 중입니다!").start();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await page.goto(this.leetcodeUrl);
    await page.waitForSelector(listBoxButtonSelector);
    await page.click(listBoxButtonSelector);
    await page.waitForSelector(languageListSelector);

    const javaScriptButtonSeletor = await page.evaluate((selector) => {
      return "#" + Array.from(document.querySelector(selector).children)
        .find(el => el.textContent === "JavaScript")
        .getAttribute("id");
    }, languageListSelector);

    await page.waitForSelector(javaScriptButtonSeletor);
    await page.click(javaScriptButtonSeletor);
    await sleep(1000);
    await page.waitForSelector(editorSelector);

    const editorHandle = await page.$(editorSelector);
    const code = await page.evaluate(editorHandle => editorHandle.innerText, editorHandle);

    this.fileCode = code;

    await browser.close();

    spinner.succeed("성공적으로 완료되었습니다.");
  }

  async generateProblemFile() {
    const fileCodeArray = this.fileCode.split("\n");
    const remarkStartIndex = fileCodeArray.findIndex((textCode) => textCode === "/**");
    const remark = ` * leetcode problem link: ${this.leetcodeUrl}`;
    const space = " *";

    fileCodeArray.splice(remarkStartIndex + 1, 0, ...[remark, space]);

    this.fileCode = fileCodeArray.join("\n");
  }

  async installProblemFile() {

  }
}

module.exports = ProblemService;
