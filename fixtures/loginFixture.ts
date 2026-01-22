import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Declare the types of your fixtures
type MyFixtures = {
  loggedInPage: LoginPage;
};

// Extend the base test to include our new "loggedInPage" fixture
export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // 1. Setup: Go to login and perform login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    // 2. Use: Pass the logged-in page to the test
    await use(loginPage);

    // 3. Teardown (Optional): Runs after test finishes
    // e.g., await page.close();
  },
});

export { expect } from '@playwright/test';