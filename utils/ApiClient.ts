// utils/ApiClient.ts
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  readonly request: APIRequestContext;
  readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${endpoint}`);
  }

  async post(endpoint: string, data: any): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${endpoint}`, { data });
  }

  async put(endpoint: string, data: any): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${endpoint}`, { data });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${endpoint}`);
  }
}