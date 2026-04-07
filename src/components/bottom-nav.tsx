"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Home, FolderKanban, Link as LinkIcon, Settings } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/workspaces', icon: FolderKanban, label: 'Workspaces' },
    { path: '/links', icon: LinkIcon, label: 'Links' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1e2749] border-t border-[rgba(228,217,255,0.1)] safe-area-inset-bottom z-50">
      <div className="flex justify-around items-center h-16 max-w-[600px] mx-auto px-4">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = pathname === path || 
                          (path !== '/dashboard' && pathname.startsWith(path));
          return (
            <Link
              key={path}
              href={path}
              className={`flex flex-col items-center justify-center gap-1 transition-all ${
                isActive 
                  ? 'text-[#e4d9ff]' 
                  : 'text-[rgba(250,250,255,0.5)]'
              }`}
            >
              <Icon 
                className={`w-5 h-5 transition-all ${
                  isActive ? 'drop-shadow-[0_0_8px_rgba(228,217,255,0.5)]' : ''
                }`} 
              />
              <span className="text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
