import { apiClient } from './client';

export interface Workspace {
  id: string;
  name: string;
  status?: 'active' | 'suspended' | 'deactivated';
  owner?: string;
  members?: number;
  links?: number;
  memberLimit?: number;
  linkLimit?: number;
  isPersonal?: boolean;
  ownerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const workspacesApi = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    const response = await apiClient.get<Workspace[]>('/api/workspaces');
    return response.data;
  },

  getWorkspace: async (id: string): Promise<Workspace> => {
    const response = await apiClient.get<Workspace>(`/api/workspaces/${id}`);
    return response.data;
  },

  createWorkspace: async (name: string): Promise<Workspace> => {
    const response = await apiClient.post<Workspace>('/api/workspaces', { name: name.toString() });
    return response.data;
  },

  updateWorkspace: async (id: string, data: Partial<Workspace>): Promise<Workspace> => {
    const response = await apiClient.put<Workspace>(`/api/workspaces/${id}`, data);
    return response.data;
  },

  deleteWorkspace: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/workspaces/${id}`);
  },

  // Legacy methods for backward compatibility
  inviteMember: async (workspaceId: string, email: string, role: string): Promise<boolean> => {
    // This endpoint may not exist in your API yet
    console.warn('inviteMember not implemented in current API');
    return true;
  },

  removeMember: async (workspaceId: string, memberId: string | number): Promise<boolean> => {
    console.warn('removeMember not implemented in current API');
    return true;
  },

  updateWorkspaceStats: async (id: string, stats: Partial<Workspace>): Promise<Workspace> => {
    return workspacesApi.updateWorkspace(id, stats);
  },
};
