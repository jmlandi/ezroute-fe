import Link from 'next/link';

import { Plus, Copy, BarChart3 } from 'lucide-react';

export default function Links() {
  const links = [
    { 
      id: 1,
      short: 'ezrt.io/promo', 
      destination: 'https://example.com/spring-sale',
      utm: { source: 'twitter', medium: 'social', campaign: 'spring24' },
      clicks: 156,
      created: '2026-03-15'
    },
    { 
      id: 2,
      short: 'ezrt.io/docs', 
      destination: 'https://docs.example.com',
      utm: null,
      clicks: 89,
      created: '2026-03-10'
    },
    { 
      id: 3,
      short: 'ezrt.io/app', 
      destination: 'https://app.example.com/onboarding',
      utm: { source: 'email', medium: 'newsletter', campaign: 'launch' },
      clicks: 234,
      created: '2026-03-05'
    },
    { 
      id: 4,
      short: 'ezrt.io/blog', 
      destination: 'https://blog.example.com/new-features',
      utm: { source: 'linkedin', medium: 'social', campaign: 'content' },
      clicks: 67,
      created: '2026-03-01'
    },
  ];
  
  const copyLink = (short: string) => {
    navigator.clipboard.writeText(`https://${short}`);
    // In real app, show toast notification
  };
  
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Links</h1>
          <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">Manage your short links</p>
        </div>
        <Link 
          href="/links/create"
          className="w-10 h-10 bg-[#e4d9ff] text-[#30343f] rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(228,217,255,0.4)] transition-all"
        >
          <Plus className="w-5 h-5" />
        </Link>
      </div>
      
      {/* Links List */}
      <div className="space-y-3">
        {links.map((link) => (
          <div 
            key={link.id}
            className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-3"
          >
            {/* Short Link */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-1">
                <div className="text-[#e4d9ff] break-all">{link.short}</div>
                <div className="text-xs text-[rgba(250,250,255,0.5)] break-all">
                  {link.destination}
                </div>
              </div>
              <button
                onClick={() => copyLink(link.short)}
                className="p-2 hover:bg-[#1e2749] rounded-lg transition-colors flex-shrink-0"
                title="Copy link"
              >
                <Copy className="w-4 h-4 text-[rgba(250,250,255,0.6)]" />
              </button>
            </div>
            
            {/* UTM Tags */}
            {link.utm && (
              <div className="flex flex-wrap gap-1.5">
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  source: {link.utm.source}
                </div>
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  medium: {link.utm.medium}
                </div>
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  campaign: {link.utm.campaign}
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="flex items-center justify-between text-sm pt-2 border-t border-[rgba(228,217,255,0.05)]">
              <div className="flex items-center gap-1.5 text-[rgba(250,250,255,0.6)]">
                <BarChart3 className="w-4 h-4" />
                {link.clicks} clicks
              </div>
              <div className="text-xs text-[rgba(250,250,255,0.4)]">
                {new Date(link.created).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
