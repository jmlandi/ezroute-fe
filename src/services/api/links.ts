import { apiClient } from './client';

export interface UtmTags {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
}

export interface LinkItem {
  id: string;
  short?: string;
  shortCode?: string;
  destination?: string;
  originalUrl: string;
  utm?: UtmTags | null;
  searchParams?: Record<string, string>;
  clicks?: number;
  created?: string;
  createdAt?: string;
  workspace?: string;
  workspaceId?: string;
  isActive?: boolean;
  userId?: string;
  createdBy?: string;
}

export const linksApi = {
  getLinks: async (workspaceId?: string): Promise<LinkItem[]> => {
    // to-do: apply new API endpoint for fetching links when available
    console.warn('getLinks endpoint not available in current API');
    return [];
  },

  createLink: async (data: {
    workspaceId: string;
    originalUrl: string;
    searchParams?: Record<string, string>;
    isActive?: boolean;
  }): Promise<LinkItem> => {
    const response = await apiClient.post<LinkItem>('/api/links', data);
    return response.data;
  },
};
