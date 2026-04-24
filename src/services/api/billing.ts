// Note: These endpoints are not in your current API yet
// Update this file once you add billing endpoints to your backend

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
    // TODO: Replace with actual API call once billing endpoints are added
    const plans: Plan[] = [
      { tier: 'Tier 1', price: '$0', workspaces: 1, members: 3, links: 15 },
      { tier: 'Tier 2', price: '$19', workspaces: 3, members: 5, links: 30, recommended: true },
      { tier: 'Tier 3', price: '$39', workspaces: 6, members: 10, links: 60 },
      { tier: 'Tier 4', price: '$79', workspaces: 12, members: 20, links: 120 },
    ];
    return plans;
  },

  getCurrentBilling: async (): Promise<CurrentBilling> => {
    // TODO: Replace with actual API call once billing endpoints are added
    const defaultBilling = {
      currentPlan: 'Tier 2',
      lastPaymentDate: '2022-01-01',
    };
    return defaultBilling;
  },

  changePlan: async (newPlanTier: string): Promise<{ success: boolean; currentPlan: string }> => {
    // TODO: Replace with actual API call once billing endpoints are added
    console.warn('changePlan not implemented in current API');
    return { success: true, currentPlan: newPlanTier };
  }
};
