import { workspacesApi } from './workspaces';
import { linksApi } from './links';

export interface DashboardStat {
  label: string;
  value: string;
  iconName: string;
}

export interface RecentLink {
  short: string;
  destination: string;
  clicks: number;
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStat[]> => {
    try {
      const workspaces = await workspacesApi.getWorkspaces();
      
      const stats: DashboardStat[] = [
        { label: 'Workspaces', value: workspaces.length.toString(), iconName: 'trendingUp' },
        { label: 'Members', value: workspaces.reduce((sum, ws) => sum + (ws.members || 0), 0).toString(), iconName: 'users' },
        { label: 'Links', value: workspaces.reduce((sum, ws) => sum + (ws.links || 0), 0).toString(), iconName: 'linkIcon' },
      ];
      
      return stats;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default values if API call fails
      return [
        { label: 'Workspaces', value: '0', iconName: 'trendingUp' },
        { label: 'Members', value: '0', iconName: 'users' },
        { label: 'Links', value: '0', iconName: 'linkIcon' },
      ];
    }
  },

  getRecentLinks: async (): Promise<RecentLink[]> => {
    try {
      // Your API doesn't have a GET endpoint for links yet
      // This is a placeholder implementation
      // Once you add a GET /api/links endpoint to your backend, update this
      console.warn('getRecentLinks endpoint not available in current API');
      return [];
    } catch (error) {
      console.error('Error fetching recent links:', error);
      return [];
    }
  }
};
