// tests/ui/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC_AUTH_01: Verify Valid Login', async ({ page }) => {
    // 1. Perform Login with Valid Credentials
    await loginPage.login('John Doe', 'ThisIsNotAPassword');

    // 2. Assert we are redirected to the Appointment page
    await expect(page).toHaveURL(/#appointment/);
    await expect(page.locator('h2')).toContainText('Make Appointment');
  });

  test('TC_AUTH_02: Verify Invalid Login (Wrong Credentials)', async () => {
    // 1. Try to login with bad credentials
    await loginPage.login('WrongUser', 'WrongPass');

    // 2. Assert error message is shown
    await loginPage.verifyLoginError();
  });

  test('TC_AUTH_03: Verify Invalid Login (Empty Fields)', async () => {
    // 1. Try to login with empty strings
    await loginPage.login('', '');

    // 2. Assert error message is shown (Based on your finding that empty inputs trigger the server error)
    await loginPage.verifyLoginError();
  });
});