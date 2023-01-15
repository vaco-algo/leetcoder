import { CronJob as Schedule } from "cron";

import PROBLEMS from "../config/problems.js";
import LeetcodeService from "../services/leetcode.js";
import GithubService from "../services/github.js";
import toFileName from "../utils/toFileName.js";
import toFileContent from "../utils/toFileContent.js";
import state from "../utils/state.js";

const uploader = new Schedule(
  "58 10 * * Tue/Thu",
  async () => {
    const github = new GithubService();
    const leetcode = new LeetcodeService();

    try {
      const problemIndex = await github.getLatestProblemIndex();
      const url = PROBLEMS[problemIndex + 1];

      await leetcode.open(url)
        .get("title")
        .clickLanguage("JavaScript")
        .sleep(1000)
        .get("editor")
        .close();

      const uploadResult = await github.uploadFile({
        fileName: toFileName(leetcode.title),
        content: toFileContent(leetcode.editor),
        message: `(auto upload) ${leetcode.title}`,
      });

      if (!uploadResult) throw new Error();

      state.setProblem(leetcode.title);
      state.setUrl(url);
    } catch (error) {
      console.error(error);
      state.setProblem("fail");
    }
  },
  null,
  false,
  "Asia/Seoul",
);

export default uploader;
