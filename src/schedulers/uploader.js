import { CronJob as Schedule } from "cron";

import PROBLEMS from "../config/problems.js";
import LeetcodeService from "../services/leetcode.js";
import GithubService from "../services/github.js";
import toFileName from "../utils/toFileName.js";
import toFileContent from "../utils/toFileContent.js";
import state from "../utils/state.js";
import leetcode from "../services/leetcode.js";

const uploader = new Schedule(
  "58 10 * * Tue/Thu",
  async () => {
    try {
      const github = new GithubService();
      const problemIndex = await github.getLatestProblemIndex();
      const url = PROBLEMS[problemIndex + 1];

      const { title, editor } = await leetcode(url);
      const uploadResult = await github.uploadFile({
        fileName: toFileName(title),
        content: toFileContent(editor),
        message: `(auto upload) ${title}`,
      });

      if (!uploadResult) throw new Error();

      state.setProblem(title);
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
