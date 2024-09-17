# UI-Testing-POM-Playwright-js
UI testing using POM with Playwright in JS
### **Project Overview**

This project is a Playwright-based test automation framework designed to perform end-to-end testing on the UI. It employs the Page Object Model (POM) design pattern to encapsulate page-specific logic and enhance test maintainability.

### **Technologies Used**

* **Playwright:** A Node.js library to automate Chromium, Firefox and WebKit with a single API.
* **JavaScript:** The primary programming language for test scripts.
* **Page Object Model (POM):** A design pattern that separates page-specific logic from test cases.

### **Project Structure**
```
project-root
├── node_modules
├── utilities
│   ├── randomNum.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── pages
│   ├── Home-page.js
├── tests
│   └── add-app.spec.js
│   └── delete-one-app.spec.js
│   └── search-category.spec.js
└── .gitignore
```

* **tests/pages:** Contains page objects representing different pages of the application.
* **tests/add-app.spec.js:** The test verifies that an app can be successfully added to the favorites list on the home page from the apps page.
1. Navigates to the home page.
2. Navigates to the apps page.
3. Selects a random app from the apps list.
4. Adds the selected app to the favorites list on the home page.
5. Verifies that the added app is present in the favorites list on the home page.
* **tests/delete-one-app.spec.js:** The test describes the process of deleting an app.
1. Navigates to the home page
2. Randomly selects an app from a list
3. Positions the cursor on that app
4. Deletes it
5. Verifies that the deleted app is no longer visible on the screen.
* **tests/search-category.spec.js:** This test verifies that a category can be successfully opened from the search page.
1. Navigates to the homepage.
2. Accesses the search page.
3. Selects a random category from the search results list.
4. Verifies that the correct category URL is displayed after opening the selected category.
* **utilities:** The utilities folder houses functions that can be reused across multiple tests and are not specific to any particular page. For instance, it includes a function to generate random numbers within a specified range (exclusive of the minimum). Other potential functionalities could include text formatting, unique ID generation, and date handling.

### **Getting Started**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/olivaalbert1/UI-Testing-POM-Playwright-js.git
   ```
2. **Install dependencies:**
   ```bash
   npm init playwright@latest
   ```

### **Running Tests**

* **All tests in headed mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test --headed
   ```
* **Specific test file in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test tests/delete-one-app.spec.js
   ```
* **Specific test scenario in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test -g "Add app"
   ```
* **All tests in headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test
   ```
* **If all the tests pass, no report will be prompted, but you can see the report with - Show report command:**
   ```bash
   npx playwright show-report
   ```
* **Execute test showing trace:**
   ```bash
   npx playwright test --ui
   ```

### **Configuration**

* **Base URL:** Set the base URL for your application in the terminal before running tests using the `BASEURL` environment variable. You can parameterize only the environment part, for example having in playwright.config.js baseUrl: 'https://{env}.myapplication.com/' and when executing the command just indicate qa,uat,prod... or the environment in which you want to run the tests. But as it has been explicitly indicated in the technical test statement not to upload the application URL to the repository, I have decided to parameterize the entire URL by command.
We can also use tags to assign some tests to certain environments, but that was outside the scope of the test.
* **Playwright Config:** Customize the Playwright configuration in `playwright.config.js` to suit your project needs.
<br> * I've configured a single retry for failed tests.
   ```js
   module.exports = defineConfig({
     retries: 1,
   })
   ```
<br> * I've divided the 3 tests into separate files to enable parallel execution. This configuration is adjustable.
<br> * Test traces are saved for every run, regardless of the outcome. However, this behavior can be customized ('off','on','on-all-retries','on-first-retry','retain-on-failure','retain-on-first-failure','retry-with-trace').
```js
   module.exports = defineConfig({
     trace: 'on',
   })
   ```
<br> * The tests are optimized to minimize wait times, only pausing for page loads or element visibility. 'await page.waitForTimeout(3000)' should be avoided.
<br> * I attempted to implement a dynamic keystroke simulation using an array-based parameter and a foreach loop, but the execution was too fast for the page to respond. This feature had to be omitted, which is unfortunate as it would have been highly reusable.
<br> * I've selected Chrome as the default browser, but others can be added, and tests can even be run on mobile devices.
```js
   /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
   ```

### **Known Bugs and Issues**

* [Bug 1: Unable to navigate back from the Search screen. There is no apparent back button or gesture to return to the Home screen.]
* [Bug 2: After adding a recently deleted app, focus is placed on the last app in the list instead of the newly added app. This unexpected behavior disrupts the user experience and makes it difficult to manage recently added apps.]
* [Bug 3: Cannot exit the Add Apps section. Only "Open" and "Add to Favorites" options are available. Unable to navigate back to the main menu. This limits user interaction and prevents users from exploring other features within the application.]
* [Bug 4: Upon removing two apps from my favorites list, I attempted to re-add them. The system erroneously reported that the second app was already a favorite. Subsequent attempts to delete this non-existent favorite resulted in an error.]

### **Proposed Improvements**
1. The "deletion" of apps is not a true deletion and could potentially cause issues or conflicts if I delete an app and then want to re-add it. It also complicates the development of test.
2. The HTML structure in Home and Apps is different, making it difficult to reuse test steps. Data-testid attributes are very helpful and should be used more consistently.
3. The app titles displayed in the "Apps" section are not consistent with the titles used to reference those apps in the "Favorites" section. This inconsistency results in errors when checking if an app has been added to favorites. This causes tests to fail leading to flaky tests.
    <br> Example:
    - Free Games by PlayWorks != Free Games by PlayWorksFree Games by PlayWorks
    - MEGOGO — TV and Movies != MEGOGO — TV and MoviesMEGOGO — TV and Movies

* **Increase test coverage:** Add more test cases to cover different scenarios and edge cases:
    * Delete WhatchTV app (to ensure is not deleteable)
    * Delete all apps (except WhatchTV)
    * add an app to favorites that is already added
    * ...
