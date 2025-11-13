import { useState, useEffect } from 'react';
import { getBrandProfile, upsertBrandProfile } from '../services/brandService';
import { Palette, Upload, Save, AlertCircle } from 'lucide-react';

const fontOptions = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Montserrat, sans-serif',
  'Lato, sans-serif'
];

export default function BrandProfile() {
  const [brandData, setBrandData] = useState({
    logoUrl: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    fontFamily: 'Arial, sans-serif',
    brandGuidelines: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadBrandProfile();
  }, []);

  const loadBrandProfile = async () => {
    try {
      setLoading(true);
      const profile = await getBrandProfile();
      if (profile) {
        setBrandData({
          logoUrl: profile.logoUrl || '',
          primaryColor: profile.primaryColor || '#3B82F6',
          secondaryColor: profile.secondaryColor || '#10B981',
          fontFamily: profile.fontFamily || 'Arial, sans-serif',
          brandGuidelines: profile.brandGuidelines || ''
        });
      }
    } catch (err) {
      // No brand profile exists yet - that's okay
      if (err.response?.status !== 404) {
        setMessage({ type: 'error', text: 'Failed to load brand profile' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage({ type: '', text: '' });
      
      await upsertBrandProfile(brandData);
      
      setMessage({ type: 'success', text: 'Brand profile saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to save brand profile' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setBrandData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Brand Profile</h2>
        </div>

        {message.text && (
          <div className={`mb-4 p-4 rounded-lg flex items-start gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={brandData.logoUrl}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
            {brandData.logoUrl && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={brandData.logoUrl} 
                  alt="Brand logo preview" 
                  className="max-h-24 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML += '<p class="text-sm text-red-600">Failed to load image</p>';
                  }}
                />
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={brandData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={brandData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#3B82F6"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={brandData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="h-12 w-20 rounded cursor-pointer border border-gray-300"
                />
                <input
                  type="text"
                  value={brandData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  pattern="^#[0-9A-Fa-f]{6}$"
                  placeholder="#10B981"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Font
            </label>
            <select
              value={brandData.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {fontOptions.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font.split(',')[0]}
                </option>
              ))}
            </select>
            <div 
              className="mt-3 p-4 bg-gray-50 rounded-lg text-center text-2xl"
              style={{ fontFamily: brandData.fontFamily }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>

          {/* Brand Guidelines */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Guidelines
            </label>
            <textarea
              value={brandData.brandGuidelines}
              onChange={(e) => handleChange('brandGuidelines', e.target.value)}
              rows={6}
              placeholder="Enter your brand voice, tone, key messages, and any specific guidelines for ad content..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              These guidelines will help AI generate content that matches your brand identity
            </p>
          </div>

          {/* Color Preview */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Brand Preview</h3>
            <div className="flex gap-4">
              <div 
                className="flex-1 rounded-lg p-6 text-white flex items-center justify-center"
                style={{ backgroundColor: brandData.primaryColor, fontFamily: brandData.fontFamily }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Primary Color</div>
                  <div className="text-sm opacity-90">{brandData.primaryColor}</div>
                </div>
              </div>
              <div 
                className="flex-1 rounded-lg p-6 text-white flex items-center justify-center"
                style={{ backgroundColor: brandData.secondaryColor, fontFamily: brandData.fontFamily }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Secondary Color</div>
                  <div className="text-sm opacity-90">{brandData.secondaryColor}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Brand Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
