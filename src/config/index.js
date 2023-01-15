import * as dotenv from "dotenv";
dotenv.config();

const CONFIG = {
  PORT: 8000,
  BASE_URL: process.env.BASE_URL,
};

export default CONFIG;
