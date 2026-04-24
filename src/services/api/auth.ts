import { apiClient, setToken, removeToken } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  firstName: string;
  email: string;
  handle: string;
  password: string;
  profilePictureUrl?: string;
  newsletterSubscribed?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  handle: string;
  profilePictureUrl?: string;
  newsletterSubscribed?: boolean;
}

export interface UserResponse {
  access_token: string;
  user: User;
}

export interface UserInfoResponse {
  id: string;
  firstName: string;
  email: string;
  handle: string;
  profilePictureUrl?: string;
  newsletterSubscribed?: boolean;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/api/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    
    if (response.data.access_token) {
      setToken(response.data.access_token);
    }
    
    return response.data;
  },

  signup: async (data: SignUpCredentials): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/api/auth/register', data);
    
    if (response.data.access_token) {
      setToken(response.data.access_token);
    }
    
    return response.data;
  },
  
  getCurrentUser: async (): Promise<UserInfoResponse> => {
    const response = await apiClient.get<UserInfoResponse>('/api/auth/me');
    return response.data;
  },

  updateCurrentUser: async (data: Partial<SignUpCredentials>): Promise<UserInfoResponse> => {
    const response = await apiClient.put<UserInfoResponse>('/api/auth/me', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    removeToken();
  }
};
