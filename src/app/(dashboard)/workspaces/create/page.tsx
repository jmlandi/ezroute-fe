"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ArrowLeft, Users, Plus, X } from 'lucide-react';

export default function CreateWorkspace() {
  const router = useRouter();

  const [workspaceName, setWorkspaceName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invites, setInvites] = useState<string[]>([]);

  const handleAddInvite = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail && !invites.includes(inviteEmail)) {
      setInvites([...invites, inviteEmail]);
      setInviteEmail('');
    }
  };

  const handleRemoveInvite = (emailToRemove: string) => {
    setInvites(invites.filter((email) => email !== emailToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock workspace creation
    // e.g. await createWorkspace({ name: workspaceName, invites });
    router.push('/workspaces');
  };

  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/workspaces" className="flex items-center gap-2 text-[rgba(250,250,255,0.6)] hover:text-[#e4d9ff] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to workspaces
        </Link>

        <div>
          <h1 className="text-2xl">Create Workspace</h1>
          <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">
            Set up a new workspace and invite your team
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workspace Name */}
        <div className="space-y-2">
          <label htmlFor="workspaceName" className="block text-sm">
            Workspace Name
          </label>
          <input
            id="workspaceName"
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="e.g. Marketing Team, Acme Corp"
            className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
            required
          />
        </div>

        {/* Invites */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[rgba(250,250,255,0.7)]">
            <Users className="w-4 h-4" />
            Invite Members (Optional)
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInvite(e);
                  }
                }}
                placeholder="colleague@example.com"
                className="flex-1 px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] text-sm"
              />
              <button
                type="button"
                onClick={handleAddInvite}
                className="px-4 py-2.5 bg-[#273469] text-[#e4d9ff] border border-[rgba(228,217,255,0.1)] rounded-lg hover:bg-[#344175] transition-all flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Invites List */}
            {invites.length > 0 && (
              <div className="space-y-2 mt-4">
                {invites.map((email) => (
                  <div key={email} className="flex justify-between items-center bg-[#273469] rounded-lg p-3 border border-[rgba(228,217,255,0.1)]">
                    <span className="text-sm">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInvite(email)}
                      className="text-[rgba(250,250,255,0.5)] hover:text-[#ff6b6b] transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)] flex items-center justify-center gap-2 mt-4"
        >
          <Users className="w-4 h-4" />
          Create Workspace
        </button>
      </form>
    </div>
  );
}
