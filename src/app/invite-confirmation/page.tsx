"use client";
import { useRouter } from 'next/navigation';

import { CheckCircle2 } from 'lucide-react';

export default function InviteConfirmation() {
  const router = useRouter();
  
  const workspaceName = 'Team Alpha';
  const inviterName = '@janedoe';
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-[#e4d9ff]/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#e4d9ff]" />
          </div>
        </div>
        
        {/* Message */}
        <div className="space-y-3">
          <h1 className="text-2xl">You're In!</h1>
          <p className="text-[rgba(250,250,255,0.7)]">
            You've successfully joined
          </p>
          <div className="text-xl text-[#e4d9ff]">
            {workspaceName}
          </div>
          <p className="text-sm text-[rgba(250,250,255,0.6)]">
            Invited by {inviterName}
          </p>
        </div>
        
        {/* Action */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-3 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
