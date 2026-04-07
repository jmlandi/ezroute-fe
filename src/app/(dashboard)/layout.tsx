import Link from 'next/link';

import { BottomNav } from '../../components/bottom-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#30343f] relative overflow-hidden">
      {/* Subtle gradient background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e4d9ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#273469]/30 rounded-full blur-[100px]" />
      </div>
      
      <main className="pb-20 max-w-[600px] mx-auto relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
