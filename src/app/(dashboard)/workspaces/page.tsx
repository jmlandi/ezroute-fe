"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Plus, Users, Link as LinkIcon, Loader2 } from 'lucide-react';
import { workspacesApi, Workspace } from '@/services/api/workspaces';

export default function Workspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await workspacesApi.getWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error('Failed to load workspaces:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#e4d9ff]" />
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl">Workspaces</h1>
          <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">Manage your workspaces</p>
        </div>
        <button className="w-10 h-10 bg-[#e4d9ff] text-[#30343f] rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(228,217,255,0.4)] transition-all">
          <Link href="/workspaces/create">
            <Plus className="w-5 h-5" />
          </Link>
        </button>
      </div>

      {/* Workspace List */}
      <div className="space-y-4">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            href={`/workspaces/${workspace.id}`}
            className="block bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] hover:border-[rgba(228,217,255,0.3)] transition-all space-y-4"
          >
            {/* Header */}
            <div className="space-y-1">
              <h3 className="text-lg">{workspace.name}</h3>
              <p className="text-xs text-[rgba(250,250,255,0.5)]">
                Owner: {workspace.owner}
              </p>
            </div>

            {/* Usage Stats */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[rgba(250,250,255,0.6)]">
                    <Users className="w-4 h-4" />
                    Members
                  </span>
                  <span>
                    {workspace.members || 0}/{workspace.memberLimit || 1}
                  </span>
                </div>
                <div className="h-1.5 bg-[#1e2749] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e4d9ff] rounded-full transition-all"
                    style={{ width: `${((workspace.members || 0) / (workspace.memberLimit || 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-[rgba(250,250,255,0.6)]">
                    <LinkIcon className="w-4 h-4" />
                    Links
                  </span>
                  <span>
                    {workspace.links || 0}/{workspace.linkLimit || 1}
                  </span>
                </div>
                <div className="h-1.5 bg-[#1e2749] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e4d9ff] rounded-full transition-all"
                    style={{ width: `${((workspace.links || 0) / (workspace.linkLimit || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
