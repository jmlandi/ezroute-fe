"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Plus, TrendingUp, Users, Link as LinkIcon, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { dashboardApi, DashboardStat, RecentLink } from '@/services/api/dashboard';
import { workspacesApi, Workspace } from '@/services/api/workspaces';
import { authApi, UserInfoResponse } from '@/services/api/auth';

// Map string icon names to actual Lucide components
const iconMap: Record<string, any> = {
  trendingUp: TrendingUp,
  users: Users,
  linkIcon: LinkIcon,
};

 
export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [recentLinks, setRecentLinks] = useState<RecentLink[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsData, linksData, workspacesData, userData] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentLinks(),
          workspacesApi.getWorkspaces(),
          authApi.getCurrentUser(),
        ]);
        setStats(statsData);
        setRecentLinks(linksData);
        setWorkspaces(workspacesData);
        setUser(userData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
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
    <div className="px-6 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl">Dashboard</h1>
        <p className="text-sm text-[rgba(250,250,255,0.6)]">Welcome, { user?.firstName ?? "buddy" }!</p>
      </motion.div>

      {/* Workspace Switcher */}
      <motion.div
        className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <label className="text-xs text-[rgba(250,250,255,0.6)] block mb-2">
          Current Workspace
        </label>
        <select className="w-full bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] cursor-pointer">
          {workspaces.map(ws => (
            <option key={ws.id} value={ws.id}>{ws.name}</option>
          ))}
        </select>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, iconName }, index) => {
          const Icon = iconMap[iconName] || TrendingUp;
          return (
            <motion.div
              key={label}
              className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] text-center space-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              <Icon className="w-5 h-5 mx-auto text-[#e4d9ff]" />
              <div className="text-2xl">{value}</div>
              <div className="text-xs text-[rgba(250,250,255,0.6)]">{label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Links */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Recent Links</h2>
          <Link
            href="/links"
            className="text-sm text-[#e4d9ff] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {recentLinks.map((link, index) => (
            <motion.div
              key={link.short}
              className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-1">
                  <div className="text-[#e4d9ff]">{link.short}</div>
                  <div className="text-xs text-[rgba(250,250,255,0.5)] truncate">
                    {link.destination}
                  </div>
                </div>
                <div className="text-sm text-[rgba(250,250,255,0.6)]">
                  {link.clicks} clicks
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating CTA */}
      <Link
        href="/links/create"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#e4d9ff] text-[#30343f] rounded-full flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_rgba(228,217,255,0.5)] transition-all hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
