"use client";

import { Check } from 'lucide-react';

export default function Billing() {
  const currentPlan = 'Tier 2';
  const lastPaymentDate = '2022-01-01';

  const plans = [
    {
      tier: 'Tier 1',
      price: '$0',
      workspaces: 1,
      members: 3,
      links: 15,
    },
    {
      tier: 'Tier 2',
      price: '$19',
      workspaces: 3,
      members: 5,
      links: 30,
      recommended: true,
    },
    {
      tier: 'Tier 3',
      price: '$39',
      workspaces: 6,
      members: 10,
      links: 60,
    },
    {
      tier: 'Tier 4',
      price: '$79',
      workspaces: 12,
      members: 20,
      links: 120,
    },
  ];

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl">Plans & Billing</h1>
        <p className="text-sm text-[rgba(250,250,255,0.6)]">
          Choose the plan that fits your needs
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.2)] text-center space-y-1">
        <p className="text-xs text-[rgba(250,250,255,0.5)]">Current Plan</p>
        <p className="text-xl text-[#e4d9ff]">{currentPlan}</p>
      </div>

      {/* Last payment date */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.2)] text-center space-y-1">
        <p className="text-xs text-[rgba(250,250,255,0.5)]">Last payment date</p>
        <p className="text-xl text-[#e4d9ff]">{lastPaymentDate}</p>
      </div>

      {/* Horizontal line */}
      <div className="w-full border border-[rgba(228,217,255,0.2)] rounded-lg"></div>

      {/* Plans Grid */}
      <div className="space-y-4">
        {plans.map((plan) => {
          const isCurrent = plan.tier === currentPlan;

          return (
            <div
              key={plan.tier}
              className={`rounded-lg p-5 border transition-all ${plan.recommended
                ? 'bg-[#e4d9ff]/5 border-[#e4d9ff]/30'
                : 'bg-[#273469] border-[rgba(228,217,255,0.1)]'
                }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg">{plan.tier}</h3>
                    {plan.recommended && (
                      <span className="px-2 py-0.5 bg-[#e4d9ff] text-[#30343f] rounded text-xs">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-2xl mt-1">
                    {plan.price}
                    <span className="text-sm text-[rgba(250,250,255,0.5)]">/month</span>
                  </div>
                </div>
                {isCurrent && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e2749] rounded-full text-xs text-[#e4d9ff]">
                    <Check className="w-3 h-3" />
                    Current
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e4d9ff]" />
                  <span>
                    {plan.workspaces} {plan.workspaces === 1 ? 'workspace' : 'workspaces'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e4d9ff]" />
                  <span>{plan.members} members per workspace</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e4d9ff]" />
                  <span>{plan.links} links per workspace</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e4d9ff]" />
                  <span>UTM parameters</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-[#e4d9ff]" />
                  <span>Custom short paths</span>
                </div>
              </div>

              {/* Action Button */}
              {!isCurrent && (
                <button className="w-full py-2.5 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all text-sm">
                  {plans.findIndex(p => p.tier === plan.tier) > plans.findIndex(p => p.tier === currentPlan)
                    ? 'Upgrade'
                    : 'Downgrade'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-2 pt-4">
        <p className="text-xs text-[rgba(250,250,255,0.5)]">
          All plans include 24/7 support and automatic backups
        </p>
        <p className="text-xs text-[rgba(250,250,255,0.5)]">
          Prices shown in USD • Billed monthly
        </p>
      </div>
    </div>
  );
}
