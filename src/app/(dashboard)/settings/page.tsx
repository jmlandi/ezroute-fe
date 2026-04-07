"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Trash2, Upload, Loader2 } from 'lucide-react';
import { settingsApi, UserProfile } from '@/services/api/settings';

export default function Settings() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await settingsApi.getProfile();
        setUserData(profile);
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!userData) return;
    setSaving(true);
    try {
      const updated = await settingsApi.updateProfile(userData);
      setUserData(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const canChangeHandle = () => {
    if (!userData) return false;
    const lastChange = new Date(userData.lastHandleChange);
    const now = new Date();
    const daysSince = Math.floor((now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24));
    return daysSince >= 60;
  };

  const daysUntilHandleChange = () => {
    if (!userData) return 0;
    const lastChange = new Date(userData.lastHandleChange);
    const now = new Date();
    const daysSince = Math.floor((now.getTime() - lastChange.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 60 - daysSince);
  };

  if (loading || !userData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#e4d9ff]" />
      </div>
    );
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl">Settings</h1>
        <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">Manage your account</p>
      </div>

      {/* Plans and Billings */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)] flex items-center gap-2">
          Plans and Billings
        </h2>
        <Link href="/billing" className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg text-sm hover:bg-[#d4c9ef] transition-all">
          Manage Plan
        </Link>
      </div>

      {/* Profile Picture */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)] flex items-center gap-2">
          <User className="w-4 h-4" />
          Profile Picture
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#1e2749] border-2 border-[rgba(228,217,255,0.2)] flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-[rgba(250,250,255,0.4)]" />
            )}
          </div>
          <label htmlFor="profile-upload" className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg text-sm cursor-pointer hover:bg-[#d4c9ef] transition-all inline-flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload New
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Handle */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)]">Handle</h2>
        <div className="space-y-2">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,250,255,0.5)]">@</span>
            <input
              type="text"
              value={userData.handle}
              onChange={(e) => setUserData({ ...userData, handle: e.target.value })}
              disabled={!canChangeHandle()}
              className="w-full pl-8 pr-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          {!canChangeHandle() && (
            <p className="text-xs text-[rgba(250,250,255,0.5)]">
              You can change your handle again in {daysUntilHandleChange()} days
            </p>
          )}
          {canChangeHandle() && (
            <button onClick={handleSave} disabled={saving} className="text-sm text-[#e4d9ff] hover:underline disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Handle'}
            </button>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)]">Personal Information</h2>
        <div className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff]"
            />
          </div>

          <button onClick={handleSave} disabled={saving} className="text-sm text-[#e4d9ff] hover:underline disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)] flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Password
        </h2>
        <button className="px-4 py-2 bg-[#e4d9ff] text-[#30343f] rounded-lg text-sm hover:bg-[#d4c9ef] transition-all">
          Change Password
        </button>
      </div>

      {/* Newsletter */}
      <div className="bg-[#273469] rounded-lg p-5 border border-[rgba(228,217,255,0.1)] space-y-4">
        <h2 className="text-sm text-[rgba(250,250,255,0.6)]">Newsletter</h2>
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={userData.newsletter}
            onChange={(e) => setUserData({ ...userData, newsletter: e.target.checked })}
            className="w-5 h-5 rounded border-[rgba(228,217,255,0.2)] bg-[#1e2749] checked:bg-[#e4d9ff] focus:ring-2 focus:ring-[#e4d9ff]"
          />
          <span className="text-sm">
            Receive product updates and news
          </span>
        </label>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#ff6b6b]/10 rounded-lg p-5 border border-[#ff6b6b]/30 space-y-4">
        <h2 className="text-sm text-[#ff6b6b] flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Danger Zone
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-[rgba(250,250,255,0.7)]">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-[#ff6b6b] text-white rounded-lg text-sm hover:bg-[#ff5252] transition-all"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#273469] rounded-lg p-6 w-full max-w-md space-y-4 border border-[rgba(228,217,255,0.2)]">
            <div className="space-y-2">
              <h2 className="text-xl text-[#ff6b6b]">Delete Account</h2>
              <p className="text-sm text-[rgba(250,250,255,0.7)]">
                This action cannot be undone. All your data, workspaces, and links will be permanently deleted.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-[#1e2749] text-white rounded-lg hover:bg-[#273469] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle account deletion
                  console.log('Account deleted');
                }}
                className="flex-1 py-2 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] transition-all"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
