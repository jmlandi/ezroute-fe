"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { ArrowLeft, Users, Link as LinkIcon, Mail, Copy, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function WorkspaceDetail() {
  const { id } = useParams();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  
  const workspace = {
    name: 'Team Alpha',
    owner: '@janedoe',
    members: 7,
    links: 45,
    memberLimit: 10,
    linkLimit: 60,
    plan: 'Tier 3',
    warningDays: null, // Set to a number to show downgrade warning
  };
  
  const members = [
    { name: 'Jane Doe', handle: '@janedoe', role: 'Owner', avatar: null },
    { name: 'John Smith', handle: '@johnsmith', role: 'Admin', avatar: null },
    { name: 'Alice Johnson', handle: '@alice', role: 'Member', avatar: null },
    { name: 'Bob Wilson', handle: '@bob', role: 'Member', avatar: null },
    { name: 'Carol Davis', handle: '@carol', role: 'Member', avatar: null },
    { name: 'David Brown', handle: '@david', role: 'Member', avatar: null },
    { name: 'Emma White', handle: '@emma', role: 'Member', avatar: null },
  ];
  
  const inviteLink = `https://ezrt.io/invite/${id}-abc123`;
  
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    // In real app, show toast notification
  };
  
  const sendEmailInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock email invite
    setInviteEmail('');
    setShowInviteDialog(false);
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
          <h1 className="text-2xl">{workspace.name}</h1>
          <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">
            Owner: {workspace.owner} • {workspace.plan}
          </p>
        </div>
      </div>
      
      {/* Warning Banner (if downgraded) */}
      {workspace.warningDays && (
        <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-[#ff6b6b] flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <p className="text-sm">
              Workspace will be blocked in <span className="font-bold">{workspace.warningDays} days</span>
            </p>
            <p className="text-xs text-[rgba(250,250,255,0.6)]">
              You've exceeded your plan limits. Please upgrade or remove members/links.
            </p>
            <Link href="/billing" className="inline-block text-sm text-[#e4d9ff] hover:underline">
              Upgrade Plan →
            </Link>
          </div>
        </div>
      )}
      
      {/* Usage Stats */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h3 className="text-sm text-[rgba(250,250,255,0.6)]">Plan Limits</h3>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#e4d9ff]" />
                Members
              </span>
              <span>
                {workspace.members}/{workspace.memberLimit}
              </span>
            </div>
            <div className="h-2 bg-[#1e2749] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#e4d9ff] rounded-full transition-all"
                style={{ width: `${(workspace.members / workspace.memberLimit) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-[#e4d9ff]" />
                Links
              </span>
              <span>
                {workspace.links}/{workspace.linkLimit}
              </span>
            </div>
            <div className="h-2 bg-[#1e2749] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#e4d9ff] rounded-full transition-all"
                style={{ width: `${(workspace.links / workspace.linkLimit) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Members Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Members ({members.length})</h2>
          <button 
            onClick={() => setShowInviteDialog(true)}
            className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg text-sm hover:bg-[#d4c9ef] transition-all"
          >
            Invite
          </button>
        </div>
        
        <div className="space-y-2">
          {members.map((member) => (
            <div 
              key={member.handle}
              className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#1e2749] border border-[rgba(228,217,255,0.2)] flex items-center justify-center text-sm">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm">{member.name}</div>
                <div className="text-xs text-[rgba(250,250,255,0.5)]">{member.handle}</div>
              </div>
              <div className="text-xs px-2 py-1 bg-[#1e2749] rounded text-[rgba(250,250,255,0.7)]">
                {member.role}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Invite Dialog */}
      {showInviteDialog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#273469] rounded-lg p-6 w-full max-w-md space-y-6 border border-[rgba(228,217,255,0.2)]">
            <div className="space-y-2">
              <h2 className="text-xl">Invite Members</h2>
              <p className="text-sm text-[rgba(250,250,255,0.6)]">
                Invite people to join {workspace.name}
              </p>
            </div>
            
            {/* Invite Link */}
            <div className="space-y-2">
              <label className="text-sm text-[rgba(250,250,255,0.6)]">
                Share invite link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg text-sm"
                />
                <button
                  onClick={copyInviteLink}
                  className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Email Invite */}
            <div className="relative">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[rgba(228,217,255,0.1)]" />
              <div className="relative flex justify-center">
                <span className="bg-[#273469] px-3 text-xs text-[rgba(250,250,255,0.5)]">
                  or
                </span>
              </div>
            </div>
            
            <form onSubmit={sendEmailInvite} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-[rgba(250,250,255,0.6)]">
                  Send email invite
                </label>
                <div className="flex gap-2">
                  <input
                    id="email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="flex-1 px-4 py-2 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] placeholder:text-[rgba(250,250,255,0.3)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
            
            <button
              onClick={() => setShowInviteDialog(false)}
              className="w-full py-2 text-sm text-[rgba(250,250,255,0.6)] hover:text-[#fafaff] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
