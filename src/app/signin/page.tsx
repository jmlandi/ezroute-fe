"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authApi } from '@/services/api/auth';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // Call our API layer to log in
      const user = await authApi.login({
        identifier: formData.identifier,
        password: formData.password,
      });
      // Optionally store `user.token` in localStorage or cookies
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Subtle background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#e4d9ff]/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="w-full max-w-md space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl tracking-tight">ezroute.site</h1>
          <p className="text-[rgba(250,250,255,0.6)] text-sm">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="identifier" className="block text-sm">
                Handle or Email
              </label>
              <input
                id="identifier"
                type="text"
                value={formData.identifier}
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
                placeholder="@username or email"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(250,250,255,0.5)] hover:text-[#e4d9ff] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#e4d9ff] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#e4d9ff] text-[#30343f] flex items-center justify-center gap-2 rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          <span className="text-[rgba(250,250,255,0.6)]">Don't have an account? </span>
          <Link href="/signup" className="text-[#e4d9ff] hover:underline">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}