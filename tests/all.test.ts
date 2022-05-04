import { test, expect } from '@playwright/test';
import FixedRate from './fixed-rate/fixedRate';
import PayAsYouGo from './pay-as-you-go/payAsYouGo';
import e from '../src/core/elements';
import v from '../src/core/variables';

test.describe.configure({ mode: 'parallel' });

test.describe('DEEL - Create new contract', () => {
  test('create Fixed Rate contract', async () => {
    const page1 = new FixedRate();
    await page1.init();
    await page1.page.waitForSelector(e.acceptCookiesBtn);
    await page1.page.click(e.acceptCookiesBtn);
    try {
      const fixedRateCard = await page1.page.locator('.contract-selector', {hasText: 'Fixed Rate'});
      await fixedRateCard.click();
      await page1.fillFixedRateForm();
      expect(await page1.page.locator('h4[class="color-black semi-bold"]', {hasText: v.CONTRACT_NAME_FIXED_RATE})).toBeTruthy();
      expect(await page1.page.locator('span[class="contract-type"]', {hasText: v.CONTRACT_TYPE_FIXED_RATE})).toBeTruthy();
    } catch (error) {
      console.log(error);
    } finally {
      await page1.page.close();
    }
  });
  
  test('create Pay As You Go contract', async () => {
    const page1 = new PayAsYouGo();
    await page1.init();
    await page1.page.waitForSelector(e.acceptCookiesBtn);
    await page1.page.click(e.acceptCookiesBtn);
    try {
      const fixedRateCard = await page1.page.locator('.contract-selector', {hasText: 'Pay As You Go'});
      await fixedRateCard.click();
      await page1.fillPayAsYouGoForm();
      expect(await page1.page.locator('h4[class="color-black semi-bold"]', {hasText: v.CONTRACT_NAME_PAY_AS_YOU_GO})).toBeTruthy();
      expect(await page1.page.locator('span[class="contract-type"]', {hasText: v.CONTRACT_TYPE_PAY_AS_YOU_GO})).toBeTruthy();
    } catch (error) {
      console.log(error);
    } finally {
      await page1.page.close();
    }
  }); 
});

