// tests/api/auth.spec.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/ApiClient';

const BASE_URL = process.env.BASE_URL_API || 'https://fakestoreapi.com';

test.describe('Authentication API', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request, BASE_URL);
  });

  test('TC_API_AUTH_01: User Login (Positive)', async () => {
    // Standard credentials for FakeStoreAPI
    const credentials = {
      username: 'mor_2314',
      password: '83r5^_'
    };

    const response = await api.post('/auth/login', credentials);
    expect(response.status()).toBe(201);

    const body = await response.json();
    // Verify we received a token
    expect(body).toHaveProperty('token');
    console.log(`Received Token: ${body.token}`);
  });

  test('TC_API_AUTH_02: Login with Invalid Password (Negative)', async () => {
    const invalidCredentials = {
      username: 'mor_2314',
      password: 'wrong_password'
    };

    const response = await api.post('/auth/login', invalidCredentials);
    
    // FakeStoreAPI typically returns 401 for bad auth
    expect(response.status()).toBe(401);
  });
});