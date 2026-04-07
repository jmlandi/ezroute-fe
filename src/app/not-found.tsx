import Link from 'next/link';

import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl text-[rgba(250,250,255,0.3)]">404</div>
          <h1 className="text-2xl">Page Not Found</h1>
          <p className="text-[rgba(250,250,255,0.6)]">
            The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)]"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
