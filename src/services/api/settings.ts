import { authApi } from './auth';

export interface UserProfile {
  handle: string;
  firstName: string;
  email: string;
  newsletter?: boolean;
  newsletterSubscribed?: boolean;
  lastHandleChange?: string;
  profileImage?: string | null;
  profilePictureUrl?: string;
}

export const settingsApi = {
  getProfile: async (): Promise<UserProfile> => {
    const userInfo = await authApi.getCurrentUser();
    
    return {
      handle: userInfo.handle,
      firstName: userInfo.firstName,
      email: userInfo.email,
      newsletter: userInfo.newsletterSubscribed ?? false,
      profileImage: userInfo.profilePictureUrl,
      profilePictureUrl: userInfo.profilePictureUrl,
    };
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    // Map the legacy field names to the API field names
    const updateData: any = {};
    
    if (data.firstName) updateData.firstName = data.firstName;
    if (data.handle) updateData.handle = data.handle;
    if (data.email) updateData.email = data.email;
    if (data.newsletter !== undefined) {
      updateData.newsletterSubscribed = data.newsletter;
    }
    if (data.profileImage) updateData.profilePictureUrl = data.profileImage;
    if (data.profilePictureUrl) updateData.profilePictureUrl = data.profilePictureUrl;
    
    const updatedUser = await authApi.updateCurrentUser(updateData);
    
    return {
      handle: updatedUser.handle,
      firstName: updatedUser.firstName,
      email: updatedUser.email,
      newsletter: updatedUser.newsletterSubscribed ?? false,
      profileImage: updatedUser.profilePictureUrl,
      profilePictureUrl: updatedUser.profilePictureUrl,
    };
  }
};
