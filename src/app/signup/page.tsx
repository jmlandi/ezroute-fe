"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authApi } from '@/services/api/auth';

import { Eye, EyeOff, Upload, Loader2 } from 'lucide-react';

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    handle: '',
    firstName: '',
    email: '',
    password: '',
    newsletter: false,
    acceptPrivacy: false,
  });

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //      setProfileImage(reader.result as string);
  //    };
  //    reader.readAsDataURL(file);
  //  }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // if (!formData.acceptPrivacy) {
    //   alert('Please accept the Privacy Policy to continue');
    //   return;
    // }
    
    setIsLoading(true);
    setError(null);

    try {
      // Mock registration calling the API layer
      await authApi.signup({
        handle: formData.handle,
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        newsletterSubscribed: formData.newsletter,
      });
      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24">
      <div className="w-full max-w-md mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl tracking-tight">Create Account</h1>
          <p className="text-[rgba(250,250,255,0.6)] text-sm">Join ezroute.site</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Profile Picture
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[#1e2749] border-2 border-[rgba(228,217,255,0.2)] flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-[rgba(250,250,255,0.4)]" />
                )}
              </div>
              <label htmlFor="profile-pic" className={`absolute bottom-0 right-0 w-8 h-8 bg-[#e4d9ff] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#d4c9ef] transition-all ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                <Upload className="w-4 h-4 text-[#30343f]" />
              </label>
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
                className="hidden"
              />
            </div>
            <p className="text-xs text-[rgba(250,250,255,0.5)]">Upload profile picture</p>
          </div>*/}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="handle" className="block text-sm">
                Handle
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,250,255,0.5)]">@</span>
                <input
                  id="handle"
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full pl-8 pr-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] disabled:opacity-50"
                  placeholder="username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] disabled:opacity-50"
                placeholder="John"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] disabled:opacity-50"
                placeholder="you@example.com"
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
                  className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] disabled:opacity-50"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(250,250,255,0.5)] hover:text-[#e4d9ff] transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className={`flex items-start gap-3 cursor-pointer group ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                disabled={isLoading}
                className="mt-1 w-4 h-4 rounded border-[rgba(228,217,255,0.2)] bg-[#1e2749] checked:bg-[#e4d9ff] focus:ring-2 focus:ring-[#e4d9ff]"
              />
              <span className="text-sm text-[rgba(250,250,255,0.7)] group-hover:text-[#fafaff]">
                Subscribe to newsletter
              </span>
            </label>

            {/*
            <label className={`flex items-start gap-3 cursor-pointer group ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                type="checkbox"
                checked={formData.acceptPrivacy}
                onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                disabled={isLoading}
                required
                className="mt-1 w-4 h-4 rounded border-[rgba(228,217,255,0.2)] bg-[#1e2749] checked:bg-[#e4d9ff] focus:ring-2 focus:ring-[#e4d9ff]"
              />
              <span className="text-sm text-[rgba(250,250,255,0.7)] group-hover:text-[#fafaff]">
                I accept the <Link href="/privacy" className="text-[#e4d9ff] hover:underline">Privacy Policy</Link>
              </span>
            </label>
            */}

          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full py-3 bg-[#e4d9ff] text-[#30343f] flex justify-center items-center gap-2 rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-sm">
          <span className="text-[rgba(250,250,255,0.6)]">Already have an account? </span>
          <Link href="/signin" className="text-[#e4d9ff] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
