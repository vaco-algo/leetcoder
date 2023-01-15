import KRLocalISOString from "./KRLocalISOString.js";

const state = (() => {
  let problem = "";
  let url = "";
  let latestWakedUp = KRLocalISOString();

  return {
    getProblem: () => {
      return problem;
    },
    getUrl: () => {
      return url;
    },
    getWakeUp: () => {
      return latestWakedUp;
    },
    setProblem: (str) => {
      problem = str;
    },
    setUrl: (str) => {
      url = str;
    },
    wakeUp: () => {
      latestWakedUp = KRLocalISOString();
    },
  };
})();

export default state;
