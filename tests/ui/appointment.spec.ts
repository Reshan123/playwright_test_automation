import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AppointmentPage } from '../../pages/AppointmentPage';
import { HistoryPage } from '../../pages/HistoryPage';

test.describe('Appointment Booking Tests', () => {
  let loginPage: LoginPage;
  let appointmentPage: AppointmentPage;
  let historyPage: HistoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    appointmentPage = new AppointmentPage(page);
    historyPage = new HistoryPage(page);

    await loginPage.goto();
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
  });

  test('TC_APPT_01: Verify Successful Appointment Booking (Happy Path)', async ({ page }) => {
    // US Date Format: MM/DD/YYYY
    const testDate = new Date().toLocaleDateString(); 
    const testComment = 'Regular Checkup';

    // 1. Fill out the form
    await appointmentPage.selectProgram('Medicaid');
    await appointmentPage.bookAppointment('Hongkong CURA Healthcare Center', testDate, testComment);

    // 2. Assert we are on the confirmation page
    await expect(appointmentPage.confirmationHeader).toBeVisible();

    // 3. Navigate to History to confirm persistence (E2E Check)
    await historyPage.navigateToHistory();
    await historyPage.verifyAppointmentExists(testDate, testComment);
  });

  test('TC_APPT_02: Verify Date Field Requirement', async ({ page }) => {
    // 1. Attempt to book without a date
    await appointmentPage.commentInput.fill('Missing Date Test');
    await appointmentPage.bookButton.click({ force: true });

    // 2. Assert we are STILL on the appointment page
    await expect(page).toHaveURL(/#appointment/);
    await expect(appointmentPage.confirmationHeader).not.toBeVisible();
  });

  test('TC_APPT_03: Verify Past Date Acceptance (Documenting Behavior)', async ({ page }) => {
    // Using a clear past date (MM/DD/YYYY)
    const pastDate = '01/01/2020';
    
    await appointmentPage.bookAppointment('Tokyo CURA Healthcare Center', pastDate, 'Back to the future');
    
    // Assert that it DID successfully book (proving the logic gap exists)
    await expect(appointmentPage.confirmationHeader).toBeVisible();
  });
});