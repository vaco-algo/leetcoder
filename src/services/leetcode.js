import axios from "axios";
import { JSDOM } from "jsdom";

const leetcode = async (url) => {
  const { data } = await axios.get(url);
  const { document } = new JSDOM(data).window;
  const json = document.getElementById("__NEXT_DATA__").innerHTML;
  const config = JSON.parse(json);

  const queries = config
    ?.props
    ?.pageProps
    ?.dehydratedState
    ?.queries;

  const { questionId, title } = queries
    ?.find((query) => query.queryKey.includes("questionTitle"))
    ?.state
    ?.data
    ?.question;
  const problemTitle = `${questionId}. ${title}`;

  const editor = queries
    ?.find((query) => query.queryKey.includes("questionEditorData"))
    ?.state
    ?.data
    ?.question
    ?.codeSnippets
    ?.find((snippet) => snippet.lang === "JavaScript")
    ?.code;

  return {
    title: problemTitle,
    editor,
  };
};

export default leetcode;
