import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Declare types 
type MyFixtures = {
  loggedInPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }, use) => {
    // 1. Setup: Go to login and perform login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    // 2. Use: Pass the logged-in page to the test
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';