import { test, expect } from '@playwright/test';

test('Recorded Test', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Escape');
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('23/12/2026');
  await page.getByRole('textbox', { name: 'Comment' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('Regular Checkup');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  await expect(page.locator('h2')).toContainText('Appointment Confirmation');
  await page.getByText('Regular Checkup').click();
  await expect(page.locator('#visit_date')).toContainText('23/12/2026');
  await page.getByRole('link', { name: 'Go to Homepage' }).click();
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByText('Facility Tokyo CURA')).toBeVisible();
});