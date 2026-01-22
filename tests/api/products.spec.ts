// tests/api/products.spec.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/ApiClient';

const BASE_URL = process.env.BASE_URL_API || 'https://fakestoreapi.com';

test.describe('Products API Management', () => {
  let api: ApiClient;

  test.beforeEach(async ({ request }) => {
    api = new ApiClient(request, BASE_URL);
  });

  test('TC_API_PROD_01: Get All Products (Positive)', async () => {
    const response = await api.get('/products');
    expect(response.status()).toBe(200);

    const body = await response.json();
    // Verify it returns an array and has items
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('TC_API_PROD_02: Add New Product (Positive)', async () => {
    const newProduct = {
      title: 'Test Product',
      price: 13.5,
      description: 'lorem ipsum set',
      image: 'https://i.pravatar.cc',
      category: 'electronic'
    };

    const response = await api.post('/products', newProduct);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Test Product');
  });

  test('TC_API_PROD_03: Update Product (Positive)', async () => {
    const updatePayload = {
      title: 'Updated Title',
      price: 20.0
    };

    // Update product with ID 7
    const response = await api.put('/products/7', updatePayload);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
  });

  test('TC_API_PROD_04: Delete Product (Positive)', async () => {
    // Delete product with ID 6
    const response = await api.delete('/products/6');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 6);
  });
});