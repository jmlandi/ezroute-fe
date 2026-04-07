"use client";

import { useRouter } from 'next/navigation';

import { motion } from 'motion/react';
import { Zap, Users, BarChart3, Shield } from 'lucide-react';

export default function Welcome() {
  const router = useRouter();

  const features = [
    { icon: Zap, title: 'Fast & Simple', desc: 'Create short links in seconds' },
    { icon: Users, title: 'Team Collaboration', desc: 'Work together in workspaces' },
    { icon: BarChart3, title: 'UTM Tracking', desc: 'Track campaigns with ease' },
    { icon: Shield, title: 'Secure', desc: 'Your data is protected' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#e4d9ff]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#273469]/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="w-full max-w-md space-y-12 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo & Title */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl tracking-tight">ezroute.site</h1>
          <p className="text-lg text-[rgba(250,250,255,0.7)]">
            Link management,<br />simplified.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-[#273469]/50 backdrop-blur-sm rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <feature.icon className="w-6 h-6 text-[#e4d9ff]" />
              <div className="space-y-1">
                <div className="text-sm">{feature.title}</div>
                <div className="text-xs text-[rgba(250,250,255,0.5)]">{feature.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            onClick={() => router.push('/signup')}
            className="w-full py-3 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)]"
          >
            Get Started
          </button>
          <button
            onClick={() => router.push('/signin')}
            className="w-full py-3 bg-transparent border border-[rgba(228,217,255,0.2)] text-[#fafaff] rounded-lg hover:bg-[rgba(228,217,255,0.05)] transition-all"
          >
            Sign In
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center text-xs text-[rgba(250,250,255,0.4)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Futuristic. Minimal. Powerful.
        </motion.div>
      </motion.div>
    </div>
  );
}
