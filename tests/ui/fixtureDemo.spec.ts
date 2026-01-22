// Important: Import 'test' from your fixture file, NOT @playwright/test
import { test, expect } from '../../fixtures/loginFixture';

test('TC_FIXTURE_01: Verify Auto-Login works', async ({ loggedInPage }) => {
  // We are already logged in!
  // Just check if we are on the appointment page
  await expect(loggedInPage.page).toHaveURL(/#appointment/);
  
  console.log('Fixture successfully handled the login!');
});