import { apiClient } from './client';

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface UserResponse {
  id: string;
  handle: string;
  email: string;
  token: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    // Return a mocked successful response
    const mockUser: UserResponse = {
      id: 'usr_123',
      handle: credentials.identifier.startsWith('@') ? credentials.identifier : '@johndoe',
      email: credentials.identifier.includes('@') && !credentials.identifier.startsWith('@') ? credentials.identifier : 'jane@example.com',
      token: 'mock_jwt_token_12345'
    };

    const response = await apiClient.post(mockUser, 800);
    return response.data;
  },

  signup: async (data: any): Promise<UserResponse> => {
    const response = await apiClient.post({
      id: 'usr_NEW',
      handle: '@newuser',
      email: 'new@example.com',
      token: 'mock_jwt_new',
    }, 1000);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post({}, 400);
  }
};
