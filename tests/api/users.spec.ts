// tests/api/users.spec.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/ApiClient';
// Import the JSON data
import testData from '../../fixtures/users.json';

// Read the API URL from your .env file
const BASE_URL = process.env.BASE_URL_API || 'https://fakestoreapi.com';

test.describe('User API Management', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    // Initialize our helper before each test
    api = new ApiClient(request, BASE_URL);
  });

  test('TC_API_01: Get Single User (Positive)', async () => {
    // 1. Send GET request for user ID 1
    const response = await api.get('/users/1');

    // 2. Assert Status Code is 200 (OK)
    expect(response.status()).toBe(200);

    // 3. Assert Response Body contains correct data
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('email');
    expect(body.address).toHaveProperty('city');
  });

  test('TC_API_02: Create New User (Positive)', async () => {
    // 1. Define the new user payload
    const newUser = {
      email: 'test@gmail.com',
      username: 'test_user',
      password: 'password123',
      name: { firstname: 'John', lastname: 'Doe' },
      address: {
        city: 'Colombo',
        street: 'Galle Road',
        number: 3,
        zipcode: '12345-6789',
        geolocation: { lat: '-37.3159', long: '81.1496' }
      },
      phone: '1-570-236-7033'
    };

    // 2. Send POST request
    const response = await api.post('/users', newUser);

    // 3. Assert Status Code is 201 (FakeStoreAPI returns 200 for creation, not 201)
    expect(response.status()).toBe(201);

    // 4. Validate response contains an ID (indicating creation)
    const body = await response.json();
    expect(body).toHaveProperty('id');
    console.log(`Created User ID: ${body.id}`);
  });

  test('TC_API_03: Delete User (Positive)', async () => {
    // 1. Send DELETE request for user ID 6
    const response = await api.delete('/users/6');

    // 2. Assert Status Code is 200
    expect(response.status()).toBe(200);

    // 3. Validate response
    const body = await response.json();
    // FakeStoreAPI returns the deleted object
    expect(body).toHaveProperty('id', 6);
  });

  test('TC_API_04: Create User with Invalid Data (Negative)', async () => {
    // Sending a payload that might be rejected (or just testing API resilience)
    // Note: FakeStoreAPI is very permissible, so we mostly check it doesn't crash (500 error)
    const invalidUser = {
      email: 12345, // Invalid email format (sending number instead of string)
    };

    const response = await api.post('/users', invalidUser);
    
    // We expect the API to handle this gracefully (not 500 server error)
    expect(response.status()).not.toBe(500);
  });
});

test.describe('Data-Driven User Tests', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request, BASE_URL);
  });

  // Loop through each item in the JSON file
  for (const data of testData) {
    test(`Create User: ${data.desc}`, async () => {
      const newUser = {
        email: data.email,
        username: data.username,
        password: data.password,
        name: { firstname: 'Test', lastname: 'User' }
      };

      const response = await api.post('/users', newUser);
      expect(response.status()).toBe(data.expectedStatus);
      
      const body = await response.json();
      expect(body).toHaveProperty('id');
      console.log(`Test passed for: ${data.desc}`);
    });
  }
});