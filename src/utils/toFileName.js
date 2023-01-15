import KRLocalISOString from "./KRLocalISOString.js";

function toFileName(text) {
  const localKRDateText = KRLocalISOString()
    .slice(2, 10)
    .replaceAll("-", "");

  return `[${localKRDateText}] ${text}.js`;
}

export default toFileName;
