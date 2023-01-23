import KRLocalISOString from "./KRLocalISOString.js";

function toFileName(text) {
  const localKRDateText = KRLocalISOString()
    .slice(2, 10)
    .replace(/-/g, "");

  return `[${localKRDateText}] ${text}.js`;
}

export default toFileName;
