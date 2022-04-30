require('dotenv').config();
const { chromium } = require('playwright');
const e = require('../../src/core/elements');
const v = require('../../src/core/variables');

class FixedRate {
    constructor(browser) {
        this.browser = browser;
    }

    async bringToFront(page) {
        await page.bringToFront();
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

    async fillFixedRateForm() {
        await this.page.waitForSelector(e.contractName);
        await this.page.click(e.contractName);
        await this.page.type(e.contractName, v.CONTRACT_NAME_FIXED_RATE);
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('[data-qa="contractor-tax-residence"]');
        await this.page.click('[data-qa="contractor-tax-residence"]');
        await this.page.keyboard.type('United States');
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('[data-qa="contractor-tax-residence-province"]');
        await this.page.click('[data-qa="contractor-tax-residence-province"]');
        await this.page.keyboard.type('Colorado');
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('input[name="jobTitle"]');
        await this.page.click('input[name="jobTitle"]');
        await this.page.keyboard.type('Software QA Engineer');
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('p[class="suggestions-option"]');
        await this.page.click('p[class="suggestions-option"]');
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('textarea[name="scope"]');
        await this.page.click('textarea[name="scope"]');
        await this.page.keyboard.type('This is a Fixed Rate Scope of Work entry!');
        await this.page.waitForSelector('[name="effectiveDate"]');
        await this.page.click('[name="effectiveDate"]');

        // Selecting the previous day as the effective date
        await this.page.waitForSelector(`[aria-label="${new Date().toLocaleString('en-US', {month: 'short'})} ${new Date().getDate() - 1}, ${new Date().getFullYear().toString()}"]`);
        await this.page.click(`[aria-label="${new Date().toLocaleString('en-US', {month: 'short'})} ${new Date().getDate() - 1}, ${new Date().getFullYear().toString()}"]`);

        await this.page.waitForSelector('button[data-qa="next"]');
        await this.page.click('button[data-qa="next"]');


        await this.page.waitForSelector('[data-qa="currency-select"]');
        await this.page.click('[data-qa="currency-select"]');

        await this.page.keyboard.type('GBP - British Pound');
        await this.page.keyboard.press('Tab');
        await this.page.waitForSelector('[class="money-input-new-input-container"]');
        await this.page.click('[class="money-input-new-input-container"]');
        await this.page.keyboard.type('1000');
        await this.page.waitForSelector('[data-qa="cycle-select"]');
        await this.page.click('[data-qa="cycle-select"]');
        await this.page.keyboard.type('Weekly');
        await this.page.keyboard.press('Tab');

        await this.page.waitForSelector('[data-qa="next"]');
        await this.page.click('[data-qa="next"]');
        await this.page.waitForSelector('[data-qa="labeled-row"]');
        await this.page.waitForSelector('[data-qa="next"]');
        await this.page.click('[data-qa="next"]');
        await this.page.waitForSelector('[data-qa="termination-date-card"]');
        await this.page.waitForSelector('[data-qa="next"]');
        await this.page.click('[data-qa="next"]');
        await this.page.waitForSelector('[data-qa="contract-compliance-card"]');
        await this.page.waitForSelector('[data-qa="create-contract"]');
        await this.page.click('[data-qa="create-contract"]');

        await this.page.waitForSelector('[data-qa="client-signatures"]');
        const sideBarMenuLink = await this.page.locator(e.sideBarMenuLink, {hasText: "Contracts"});
        await sideBarMenuLink.click();
        await this.page.screenshot({path: 'src/screenshots/fixedRate.png'});
    }
}

module.exports = FixedRate;