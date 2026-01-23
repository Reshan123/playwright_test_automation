import { Page, Locator, expect } from '@playwright/test';

export class AppointmentPage {
  readonly page: Page;
  readonly facilitySelect: Locator;
  readonly readmissionCheck: Locator;
  readonly dateInput: Locator;
  readonly commentInput: Locator;
  readonly bookButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.facilitySelect = page.locator('#combo_facility');
    this.readmissionCheck = page.locator('#chk_hospotal_readmission');
    this.dateInput = page.locator('#txt_visit_date');
    this.commentInput = page.locator('#txt_comment');
    this.bookButton = page.locator('#btn-book-appointment');
    this.confirmationHeader = page.locator('h2', { hasText: 'Appointment Confirmation' });
  }

  async selectProgram(programName: 'Medicare' | 'Medicaid' | 'None') {
    await this.page.getByLabel(programName).check();
  }

  async bookAppointment(facility: string, date: string, comment: string) {
    await this.facilitySelect.selectOption(facility);
    
    // 1. Fill the date
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
    await this.page.keyboard.press('Escape');

    // 3. Fill the comment
    await this.commentInput.fill(comment);
    
    // 4. Click book
    await this.bookButton.click({ force: true });
  }
}