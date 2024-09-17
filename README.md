# UI-Testing-POM-Playwright-js
UI testing using POM with Playwright in JS
### **Project Overview**

This project is a Playwright-based test automation framework designed to perform end-to-end testing on the UI. It employs the Page Object Model (POM) design pattern to encapsulate page-specific logic and enhance test maintainability.

### **Technologies Used**

* **Playwright:** A Node.js library to automate Chromium, Firefox and WebKit with a single API.
* **JavaScript:** The primary programming language for test scripts.
* **Page Object Model (POM):** A design pattern that separates page-specific logic from test cases.

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
* **Specific test file:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test tests/example.spec.js
   ```
* **Headless mode:**
   ```bash
   BASEURL='PUT_HERE_YOUR_URL' npx playwright test
   ```

### **Configuration**

* **Base URL:** Set the base URL for your application in the terminal before running tests using the `BASEURL` environment variable.
* **Playwright Config:** Customize the Playwright configuration in `playwright.config.js` to suit your project needs.

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
