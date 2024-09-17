import { test, expect } from '@playwright/test';
import { randomNum } from '../utilities/randomNum.js';

const { HomePage } = require('../pages/Home-page.js');

test.describe('Add app', () => {

    test('Add an app to home page favourites apps from apps page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto()
        
        await homePage.goToAppsPage()

        const favoriteAppsList = await page.locator('[data-testid="list-item-app_list-0"]').allInnerTexts()
        const arrayFavoriteAppList = favoriteAppsList[0].split(/\n/)
        arrayFavoriteAppList.shift()

        const appNum = randomNum(0, arrayFavoriteAppList.length)

        
        await homePage.positioningInAppList(arrayFavoriteAppList,appNum)
        await homePage.addApp()

        const homeAppList = await page.locator('[id="favourite-apps"]').allInnerTexts()
        const arrayHomeAppList = homeAppList[0].split(/\n/)

        expect(arrayHomeAppList).toContain(arrayFavoriteAppList[appNum])
        await page.close()
    })
})