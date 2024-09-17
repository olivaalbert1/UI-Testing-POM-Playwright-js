import { test, expect } from '@playwright/test';
import { randomNum } from '../utilities/randomNum.js'

const { HomePage } = require('../pages/Home-page.js')

test.describe('Search category', () => {

    test('Open a category from the search page', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goto()

        await homePage.goToSearchPage()

        const categoryList = await page.locator('[id="sn:focusable-item-3"]').allInnerTexts()
        const arrayCategoryList = categoryList[0].split(/\n/)

        const catNum = randomNum(0, arrayCategoryList.length)
        const categoryToBeSelected = arrayCategoryList[catNum]

        homePage.navigateToCategory(catNum,categoryToBeSelected)

        let categoryToSelected = categoryToBeSelected.split('&')[0].replace(' ','+')
        await expect(page).toHaveURL('/search/?q='+categoryToSelected, { timeout: 5000 });

        await page.close()
    })
})
