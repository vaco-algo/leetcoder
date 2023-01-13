const fs = require("fs/promises");
const path = require("path");

async function install(filePath, fileName, fileContent) {
  try {
    await fs.writeFile(
      path.join(filePath, fileName),
      fileContent
    );
  } catch (error) {
    return new Error(error);
  }
}

export default install;
