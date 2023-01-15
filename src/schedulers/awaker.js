import axios from "axios";
import CONFIG from "../config/index.js";
import { CronJob as Schedule } from "cron";
import state from "../utils/state.js";

const awaker = new Schedule(
  "*/10 * * * *",
  async () => {
    const { data } = await axios.get(CONFIG.BASE_URL);

    if (!!data) {
      state.wakeUp();
    };
  },
  null,
  false,
  "Asia/Seoul",
);

export default awaker;
