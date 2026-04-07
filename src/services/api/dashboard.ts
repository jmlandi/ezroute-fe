import { apiClient } from './client';
import { Plus, TrendingUp, Users, Link as LinkIcon, LucideIcon } from 'lucide-react';

export interface DashboardStat {
  label: string;
  value: string;
  iconName: string; // Since we can't easily serialize React components in real APIs, we use string identifiers
}

export interface RecentLink {
  short: string;
  destination: string;
  clicks: number;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStat[]> => {
    const mockStats: DashboardStat[] = [
      { label: 'Workspaces', value: '2', iconName: 'trendingUp' },
      { label: 'Members', value: '8', iconName: 'users' },
      { label: 'Links', value: '24', iconName: 'linkIcon' },
    ];
    const response = await apiClient.get(mockStats);
    return response.data;
  },

  getRecentLinks: async (): Promise<RecentLink[]> => {
    const mockLinks: RecentLink[] = [
      { short: 'ezrt.io/promo', destination: 'https://example.com/spring-sale', clicks: 156 },
      { short: 'ezrt.io/docs', destination: 'https://docs.example.com', clicks: 89 },
      { short: 'ezrt.io/app', destination: 'https://app.example.com', clicks: 234 },
    ];
    const response = await apiClient.get(mockLinks);
    return response.data;
  }
};
