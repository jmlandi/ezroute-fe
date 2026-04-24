const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Get token from localStorage (client-side only)
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Store token in localStorage
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

// Remove token from localStorage
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

interface ApiResponse<T> {
  data: T | null;
  status: number;
}

interface ApiError {
  message: string | null;
  status: number;
  data?: any;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T | null>  {
    
    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      try {
        error.data = await response.json();
      } catch {
        error.data = ''; 
      }
      throw error;
    }

    const rawBody = await response.text();
    let body;

    if (response.headers.get('content-type') === 'aplication/json') {
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = rawBody;
      }
    }

    return body;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    const data = await this.handleResponse<T>(response) ?? null;
    return { data, status: response.status };
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await this.handleResponse<T>(response) ?? null;
    return { data, status: response.status };
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    const data = await this.handleResponse<T>(response) ?? null;
    return { data, status: response.status };
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    const data = await this.handleResponse<T>(response) ?? null;
    return { data, status: response.status };
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
