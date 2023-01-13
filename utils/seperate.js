function seperate(txt) {
  if (typeof txt !== "string") {
    return new Error("문자열을 넣어주세요");
  }

  const result = [];
  let current = "";
  let quote = null;

  for (str of txt) {
    if (str === "\"" || str === "'") {
      if (quote === str) {
        quote = null;
        continue;
      }

      quote = str;
      continue;
    }
    if (str === " " && !quote) {
      result.push(current);
      current = "";

      continue;
    }

    current += str;
  }
  result.push(current);

  return result;
}

export default seperate;
