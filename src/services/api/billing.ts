import { apiClient } from './client';

export interface Plan {
  tier: string;
  price: string;
  workspaces: number;
  members: number;
  links: number;
  recommended?: boolean;
}

export interface CurrentBilling {
  currentPlan: string;
  lastPaymentDate: string;
}

export const billingApi = {
  getPlans: async (): Promise<Plan[]> => {
    const plans: Plan[] = [
      { tier: 'Tier 1', price: '$0', workspaces: 1, members: 3, links: 15 },
      { tier: 'Tier 2', price: '$19', workspaces: 3, members: 5, links: 30, recommended: true },
      { tier: 'Tier 3', price: '$39', workspaces: 6, members: 10, links: 60 },
      { tier: 'Tier 4', price: '$79', workspaces: 12, members: 20, links: 120 },
    ];
    const response = await apiClient.get(plans, 500);
    return response.data;
  },

  getCurrentBilling: async (): Promise<CurrentBilling> => {
    const defaultBilling = {
      currentPlan: 'Tier 2',
      lastPaymentDate: '2022-01-01',
    };
    const response = await apiClient.get(defaultBilling, 400);
    return response.data;
  },

  changePlan: async (newPlanTier: string): Promise<{ success: boolean; currentPlan: string }> => {
    const response = await apiClient.post({ success: true, currentPlan: newPlanTier }, 800);
    return response.data;
  }
};
