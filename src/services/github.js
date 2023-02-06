import axios from "axios";
import { encode } from "js-base64";
import GITHUB from "../config/github.js";

const problemDateRegex = RegExp("\\[[0-9]{6}]", "g");
const START_DATE = new Date("2023-01-14T00:00:00.000Z");

class GithubService {
  async getLatestProblemIndex() {
    const url = `https://api.github.com/repos/${GITHUB.REPO}/git/trees/${GITHUB.BRANCH}?recursive=1`;

    try {
      const { data } = await axios({
        url,
        method: "GET",
      });

      return data.tree
        .filter((file) => {
          const fileDateString = problemDateRegex.exec(file.path)?.pop();

          if (!fileDateString) return false;

          const fileDate = `20${fileDateString.substring(1, 3)}-${fileDateString.substring(3, 5)}-${fileDateString.substring(5, 7)}`;

          return START_DATE < new Date(fileDate);
        })
        .length - 1;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFile({ fileName, content, message }) {
    const url = `https://api.github.com/repos/${GITHUB.REPO}/contents/problems/${fileName}`;

    try {
      const { data } = await axios({
        url,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB.TOKEN}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          branch: GITHUB.BRANCH,
          message,
          content: encode(content),
        }),
      });

      return data.commit?.sha;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default GithubService;
