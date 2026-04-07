"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ArrowLeft, Link as LinkIcon, Hash } from 'lucide-react';

export default function CreateLink() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: '',
    customPath: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock link creation
    router.push('/links');
  };
  
  return (
    <div className="px-6 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <Link href="/links" className="flex items-center gap-2 text-[rgba(250,250,255,0.6)] hover:text-[#e4d9ff] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to links
        </Link>
        
        <div>
          <h1 className="text-2xl">Create Link</h1>
          <p className="text-sm text-[rgba(250,250,255,0.6)] mt-1">
            Generate a new short link with UTM parameters
          </p>
        </div>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination URL */}
        <div className="space-y-2">
          <label htmlFor="destination" className="block text-sm">
            Destination URL
          </label>
          <input
            id="destination"
            type="url"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="https://example.com/your-page"
            className="w-full px-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
            required
          />
        </div>
        
        {/* Custom Path */}
        <div className="space-y-2">
          <label htmlFor="customPath" className="block text-sm">
            Custom Short Path
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(250,250,255,0.5)] text-sm">
              ezrt.io/
            </div>
            <input
              id="customPath"
              type="text"
              value={formData.customPath}
              onChange={(e) => setFormData({ ...formData, customPath: e.target.value })}
              placeholder="my-link"
              className="w-full pl-[88px] pr-4 py-3 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)]"
            />
          </div>
          <p className="text-xs text-[rgba(250,250,255,0.4)]">
            Leave empty for auto-generated path
          </p>
        </div>
        
        {/* UTM Parameters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-[rgba(250,250,255,0.7)]">
            <Hash className="w-4 h-4" />
            UTM Parameters (Optional)
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="utmSource" className="block text-sm">
                Source
              </label>
              <input
                id="utmSource"
                type="text"
                value={formData.utmSource}
                onChange={(e) => setFormData({ ...formData, utmSource: e.target.value })}
                placeholder="twitter, newsletter, email"
                className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="utmMedium" className="block text-sm">
                Medium
              </label>
              <input
                id="utmMedium"
                type="text"
                value={formData.utmMedium}
                onChange={(e) => setFormData({ ...formData, utmMedium: e.target.value })}
                placeholder="social, paid, organic"
                className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="utmCampaign" className="block text-sm">
                Campaign
              </label>
              <input
                id="utmCampaign"
                type="text"
                value={formData.utmCampaign}
                onChange={(e) => setFormData({ ...formData, utmCampaign: e.target.value })}
                placeholder="spring-sale, launch, promo"
                className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="utmTerm" className="block text-sm">
                Term
              </label>
              <input
                id="utmTerm"
                type="text"
                value={formData.utmTerm}
                onChange={(e) => setFormData({ ...formData, utmCampaign: e.target.value })}
                placeholder="spring-sale, launch, promo"
                className="w-full px-4 py-2.5 bg-[#1e2749] border border-[rgba(228,217,255,0.1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4d9ff] focus:border-transparent transition-all placeholder:text-[rgba(250,250,255,0.3)] text-sm"
              />
            </div>
          </div>
        </div>
        
        {/* Preview */}
        {formData.destination && (
          <div className="bg-[#273469] rounded-lg p-4 border border-[rgba(228,217,255,0.1)] space-y-2">
            <div className="text-xs text-[rgba(250,250,255,0.5)]">Preview</div>
            <div className="space-y-1">
              <div className="text-sm text-[#e4d9ff]">
                ezrt.io/{formData.customPath || 'abc123'}
              </div>
              <div className="text-xs text-[rgba(250,250,255,0.4)] break-all">
                {formData.destination}
                {(formData.utmSource || formData.utmMedium || formData.utmCampaign || formData.utmTerm) && '?'}
                {formData.utmSource && `utm_source=${formData.utmSource}`}
                {formData.utmMedium && `${formData.utmSource ? '&' : ''}utm_medium=${formData.utmMedium}`}
                {formData.utmCampaign && `${formData.utmSource || formData.utmMedium ? '&' : ''}utm_campaign=${formData.utmCampaign}`}
              </div>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#e4d9ff] text-[#30343f] rounded-lg hover:bg-[#d4c9ef] transition-all hover:shadow-[0_0_20px_rgba(228,217,255,0.3)] flex items-center justify-center gap-2"
        >
          <LinkIcon className="w-4 h-4" />
          Create Link
        </button>
      </form>
    </div>
  );
}
