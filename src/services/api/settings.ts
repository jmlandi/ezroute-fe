import { apiClient } from './client';

export interface UserProfile {
  handle: string;
  firstName: string;
  email: string;
  newsletter: boolean;
  lastHandleChange: string;
  profileImage?: string | null;
}

export const settingsApi = {
  getProfile: async (): Promise<UserProfile> => {
    const mockProfile: UserProfile = {
      handle: 'johndoe',
      firstName: 'John',
      email: 'john@example.com',
      newsletter: true,
      lastHandleChange: '2025-12-06',
    };
    const response = await apiClient.get(mockProfile, 500);
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.post({ ...data }, 800);
    return response.data as UserProfile;
  }
};
