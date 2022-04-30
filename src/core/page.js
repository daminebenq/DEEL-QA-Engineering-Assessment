require('dotenv').config();
const { chromium } = require('playwright');
const e = require('../../src/core/elements');
const v = require('../../src/core/variables');

class Page {
    constructor(browser, page) {
        this.browser = browser;
        this.page = page;
    }
    
    async init() {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        this.page = await context.newPage();
      
        await this.page.goto(process.env.TEST_URL);
        await this.page.type(e.userEmailSelector, process.env.TEST_USER);
        await this.page.type(e.userPasswordSelector, process.env.TEST_PASSWORD);
        await this.page.click(e.userLoginSelector);
        await this.page.waitForNavigation();
        await this.page.click(e.closeModalSelector);
        const createContractTabSelector = await this.page.locator(e.sideBarMenuLink, {hasText: "Create A Contract"});
        await createContractTabSelector.click();
    }

    async bringToFront(page) {
        await page.bringToFront();
    }

    async acceptCookies(page) {
        await page.waitForSelector('[data-qa="cookie-accept"]');
        await page.click('[data-qa="cookie-accept"]');
    }
}

module.exports = exports = Page;