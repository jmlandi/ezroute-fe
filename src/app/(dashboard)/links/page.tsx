"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Plus, Copy, BarChart3, Loader2 } from 'lucide-react';
import { linksApi, LinkItem } from '@/services/api/links';
import { workspacesApi, Workspace } from '@/services/api/workspaces';

export default function Links() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [formData, setFormData] = useState({
    workspace: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    workspacesApi.getWorkspaces()
      .then(setWorkspaces)
      .catch(err => console.error('Failed to load workspaces:', err));
  }, []);

  useEffect(() => {
    setLoading(true);
    linksApi.getLinks(formData.workspace)
      .then(setLinks)
      .catch(err => console.error('Failed to load links data:', err))
      .finally(() => setLoading(false));
  }, [formData.workspace]);

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

      {/* Filter Workspace */}
      <div className="flex items-center border border-[rgba(228,217,255,0.1)] rounded-lg p-2 bg-[#1e2749] gap-1.5 text-sm text-[rgba(250,250,255,0.6)]">
        <span className="text-[rgba(250,250,255,0.6)]">Workspace:</span>
        <select
          id="workspace"
          value={formData.workspace}
          onChange={(e) => setFormData({ ...formData, workspace: e.target.value })}
          className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
        >
          <option value="" className="text-[rgba(250,250,255,0.6)]">All Workspaces</option>
          {workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </div>

      {/* Links List */}
      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-3"
          >
            {/* Workspace */}
            <div className="flex items-end border border-[rgba(228,217,255,0.1)] rounded-lg p-2 bg-[#1e2749] gap-1.5 text-sm text-[rgba(250,250,255,0.6)]">
              <span className="text-[rgba(250,250,255,0.6)]">Workspace:</span> {link.workspace}
            </div>

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
                  source: {link.utm.source || 'N/A'}
                </div>
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  medium: {link.utm.medium || 'N/A'}
                </div>
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  campaign: {link.utm.campaign || 'N/A'}
                </div>
                <div className="px-2 py-1 bg-[#1e2749] rounded text-xs text-[rgba(250,250,255,0.7)]">
                  term: {link.utm.term || 'N/A'}
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
