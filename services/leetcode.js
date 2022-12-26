const puppeteer = require("puppeteer");

class Leetcode {
  constructor() {
    this.browser = null;
    this.page = null;
    this.selectors = {
      listBoxButton: ".flex.cursor-pointer.items-center.rounded.text-left",
      languageList: "ul.absolute.mt-1.max-h-56.overflow-auto.rounded-lg.p-2.z-dropdown",
      editor: ".view-lines.monaco-mouse-cursor-text",
      title: "span.mr-2.text-lg.font-medium.text-label-1"
    };
    this.queue = Promise.resolve();
  }

  open(url) {
    this.chain(async () => {
      this.browser = await puppeteer.launch();
      this.page = await this.browser.newPage();
      await this.page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      });
      await this.page.goto(url);
    });

    return this;
  }

  close() {
    this.chain(async () => {
      await this.browser.close();
    });

    return this;
  }

  get(name) {
    this.chain(async () => {
      const selector = this.selectors[name];
      await this.page.waitForSelector(selector);
      const handle = await this.page.$(selector);
      const result = await this.page.evaluate(handle => handle.innerText, handle);

      this[name] = result;
    });

    return this;
  }

  click(name) {
    this.chain(async () => {
      const selector = this.selectors[name];

      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    });

    return this;
  }

  clickLanguage(language) {
    this.chain(async () => {
      const listBoxButtonSelector = this.selectors.listBoxButton;
      const languageListSelector = this.selectors.languageList;

      await this.page.waitForSelector(listBoxButtonSelector);
      await this.page.click(listBoxButtonSelector);
      await this.page.waitForSelector(languageListSelector);

      const languageButtonSelector = await this.page.evaluate((selector, language) => {
        return "#" + Array.from(document.querySelector(selector).children)
          .find(el => el.textContent === language)
          .getAttribute("id");
      }, languageListSelector, language);

      await this.page.waitForSelector(languageButtonSelector);
      await this.page.click(languageButtonSelector);
    });

    return this;
  }

  sleep(ms) {
    this.chain(async () => {
      await new Promise(res => setTimeout(res, ms));
    });

    return this;
  }

  then(callback) {
    callback(this.queue);
  }

  chain(callback) {
    return this.queue = this.queue.then(callback);
  }
}

module.exports = Leetcode;
