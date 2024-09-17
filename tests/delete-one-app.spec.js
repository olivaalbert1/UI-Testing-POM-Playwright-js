import { test, expect } from '@playwright/test';
import { randomNum } from '../utilities/randomNum.js'

const { HomePage } = require('../pages/Home-page.js');

test.describe('Delete app', () => {

    test('Delete one random app', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto()

        const arrayAppList = await homePage.getAppList()

        const appNum = randomNum(1, arrayAppList.length)

        await homePage.positioningInAppList(arrayAppList,appNum)

        homePage.deleteApp()

        const appToBeDeleted = arrayAppList[appNum]
        await expect(page.getByTestId(appToBeDeleted)).toHaveAttribute('style', 'width: 82px; height: 82px; margin-right: 16px; z-index: 1; box-shadow: rgba(0, 0, 0, 0) 1px 1px 35px 25px; transform: translateY(-150%) translateX(0px); opacity: 0;')

        await page.close()
    });
})