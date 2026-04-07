import { apiClient } from './client';

export interface UtmTags {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
}

export interface LinkItem {
  id: string | number;
  short: string;
  destination: string;
  utm: UtmTags | null;
  clicks: number;
  created: string;
  workspace: string;
}

export const linksApi = {
  getLinks: async (workspaceId?: string): Promise<LinkItem[]> => {
    const mockLinks: LinkItem[] = [
      { id: 1, short: 'ezrt.io/promo', destination: 'https://example.com/spring-sale', utm: { source: 'twitter', medium: 'social', campaign: 'spring24', term: 'spring24_video' }, clicks: 156, created: '2026-03-15', workspace: 'Personal Workspace' },
      { id: 2, short: 'ezrt.io/docs', destination: 'https://docs.example.com', utm: null, clicks: 89, created: '2026-03-10', workspace: 'Personal Workspace' },
      { id: 3, short: 'ezrt.io/app', destination: 'https://app.example.com/onboarding', utm: { source: 'email', medium: 'newsletter', campaign: 'launch' }, clicks: 234, created: '2026-03-05', workspace: 'Personal Workspace' },
      { id: 4, short: 'ezrt.io/blog', destination: 'https://blog.example.com/new-features', utm: { source: 'linkedin', medium: 'social', campaign: 'content' }, clicks: 67, created: '2026-03-01', workspace: 'Personal Workspace' }
    ];
    
    // Abstracted mocked filter
    const filteredLinks = workspaceId 
      ? mockLinks.filter(l => l.workspace === (workspaceId === '1' ? 'Personal Workspace' : 'Team Alpha'))
      : mockLinks;
      
    const response = await apiClient.get(filteredLinks, 500);
    return response.data;
  },

  createLink: async (data: Partial<LinkItem>): Promise<LinkItem> => {
    const newLink: LinkItem = {
      id: Date.now(),
      short: `ezrt.io/${Math.random().toString(36).substring(7)}`,
      destination: data.destination || '',
      utm: data.utm || null,
      clicks: 0,
      created: new Date().toISOString(),
      workspace: data.workspace || 'Personal Workspace',
    };
    const response = await apiClient.post(newLink, 800);
    return response.data as LinkItem;
  }
};
