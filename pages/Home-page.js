const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getList = page.locator('[id="favourite-apps"]');
    this.pageTestId = page.getByTestId('page')
    this.waitForLoadState = page.waitForLoadState('load')
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'networkidle' });
  }

  async getAppList() {
    const appList = await this.getList.allInnerTexts()
    return appList[0].split(/\n/)
  }

  async positioningInAppList(arrayAppList, appNum) {
    for (var i = 0; i < appNum; ++i) {
      await expect(this.page.getByTestId(arrayAppList[i]).first()).toHaveAttribute('data-focused', 'focused')
      await this.pageTestId.press('ArrowRight')
      await expect(this.page.getByTestId(arrayAppList[i+1]).first()).toHaveAttribute('data-focused', 'focused')
    }
  }

  async deleteApp() {
    await this.page.waitForSelector('text=Press and hold', { timeout: 4000 })
    await this.page.keyboard.down('Enter')
    await this.page.waitForSelector('text=to finish', { timeout: 4000 })
    await this.page.keyboard.up('Enter')
    await this.pageTestId.press('ArrowDown');
    await this.page.waitForSelector('text=to remove', { timeout: 4000 })
    await this.pageTestId.press('Enter');
  }
};