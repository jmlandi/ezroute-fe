import { apiClient } from './client';

export interface Workspace {
  id: string | number;
  name: string;
  owner?: string;
  members?: number;
  links?: number;
  memberLimit?: number;
  linkLimit?: number;
  isPersonal?: boolean;
}

export const workspacesApi = {
  getWorkspaces: async (): Promise<Workspace[]> => {
    const mockWorkspaces: Workspace[] = [
      { id: '1', name: 'Personal Workspace', owner: '@johndoe', members: 1, links: 12, memberLimit: 3, linkLimit: 15, isPersonal: true },
      { id: '2', name: 'Team Alpha', owner: '@janedoe', members: 7, links: 12, memberLimit: 10, linkLimit: 60 },
    ];
    const response = await apiClient.get(mockWorkspaces, 600);
    return response.data;
  },

  getWorkspace: async (id: string): Promise<Workspace> => {
    const mockWorkspace: Workspace = {
      id: id, name: 'Personal Workspace', owner: '@johndoe', members: 1, links: 12, memberLimit: 3, linkLimit: 15, isPersonal: true
    };
    const response = await apiClient.get(mockWorkspace, 400);
    return response.data;
  },

  createWorkspace: async (data: Partial<Workspace>): Promise<Workspace> => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: data.name || 'New Workspace',
      owner: '@johndoe',
      members: 1,
      links: 0,
      memberLimit: 3,
      linkLimit: 15,
      ...data
    };
    const response = await apiClient.post(newWorkspace, 800);
    return response.data as Workspace;
  },

  inviteMember: async (workspaceId: string, email: string, role: string): Promise<boolean> => {
    const response = await apiClient.post({ success: true }, 600);
    return response.data.success;
  },

  removeMember: async (workspaceId: string, memberId: string | number): Promise<boolean> => {
    const response = await apiClient.post({ success: true }, 600);
    return response.data.success;
  }
};
