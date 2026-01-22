import { Page, Locator, expect } from '@playwright/test';

export class HistoryPage {
  readonly page: Page;
  readonly menuToggle: Locator;
  readonly historyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuToggle = page.locator('#menu-toggle');
    this.historyLink = page.getByRole('link', { name: 'History' });
  }

  async navigateToHistory() {
    // The menu is hidden behind a toggle button
    await this.menuToggle.click();
    await this.historyLink.click();
  }

  async verifyAppointmentExists(date: string, comment: string) {
    // We check if any panel contains both the specific date and comment
    const appointmentItem = this.page.locator('.panel', { hasText: date }).filter({ hasText: comment });
    await expect(appointmentItem).toBeVisible();
  }
}