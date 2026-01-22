// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators based on the ID attributes from your screenshots
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
    // The error message appears in a paragraph usually with class 'text-danger' or similar
    // Based on the screenshot, we'll locate the specific text for now
    this.errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
  }

  async goto() {
    await this.page.goto('/profile.php#login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}