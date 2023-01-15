import awaker from "./awaker.js";
import uploader from "./uploader.js";

async function schedulerLoader() {
  awaker.start();
  uploader.start();
}

export default schedulerLoader;
