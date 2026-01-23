import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  
  readonly loginHeader: Locator;
  readonly demoLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
    
    // Relative XPath using 'contains' for text
    this.loginHeader = page.locator('//h2[contains(text(), "Login")]');

    // Relative XPath using attributes
    this.demoLabel = page.locator('//p[contains(@class, "lead") and contains(text(), "Please login")]');

    this.errorMessage = page.locator('text=Login failed! Please ensure the username and password are valid.');
  }

  async goto() {
    await this.page.goto('/profile.php#login');
    // Basic assertion to verify the page loaded using XPath locator
    await expect(this.loginHeader).toBeVisible();
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