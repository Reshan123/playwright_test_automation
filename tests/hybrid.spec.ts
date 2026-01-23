import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Hybrid E2E Testing (API + UI)', () => {

  test('TC_HYBRID_01: Verify API Health and Perform UI Login', async ({ page, request }) => {
    
    // --- STEP 1: API Actions (The "Backend" Check) ---
    console.log('Step 1: Checking API Status...');
    
    // We use the 'request' fixture to make an API call
    // (Using the Fallback URL in case .env is missing in CI)
    const apiBase = process.env.BASE_URL_API || 'https://fakestoreapi.com';
    const response = await request.get(`${apiBase}/products`);
    
    // Assert the "backend" is alive before wasting time on the UI
    expect(response.status(), 'API Service should be active').toBe(200);
    
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    console.log('API Check Passed: Service is Active.');


    // --- STEP 2: UI Actions (The "Frontend" Flow) ---
    console.log('Step 2: Proceeding to UI Login...');
    
    const loginPage = new LoginPage(page);
    
    // Navigate to the CURA app
    await loginPage.goto();
    
    // Perform Login
    await loginPage.login('John Doe', 'ThisIsNotAPassword');
    
    // Assert Login Success
    await expect(page).toHaveURL(/#appointment/);
    console.log('UI Check Passed: Login Successful.');
  });
});