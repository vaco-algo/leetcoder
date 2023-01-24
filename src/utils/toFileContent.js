function toFileContent(text, url) {
  const fileCodeArray = text
    .split("\n")
    .map(code => code.includes("var") ? code.replace(/var/g, "const") : code);
  const remarkStartIndex = fileCodeArray
    .findIndex((textCode) => textCode === "/**");

  const remark = ` * leetcode problem link: ${url}`;
  const space = " *";
  const linkBreak = "\n";

  fileCodeArray.splice(remarkStartIndex + 1, 0, remark, space);

  return fileCodeArray.join(linkBreak) + linkBreak;
}

export default toFileContent;
