import { useState, useEffect } from 'react';
import { getTemplates } from '../services/templateService';
import { Sparkles, Grid, Mail, Layout, Check } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Templates', icon: Grid },
  { id: 'social', name: 'Social Media', icon: Sparkles },
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'display', name: 'Display Ads', icon: Layout }
];

export default function TemplateGallery({ onSelectTemplate, selectedTemplateId, userData }) {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Generate preview text based on user data
  const getPreviewText = () => {
    const productName = userData?.productName || 'Your Product';
    const category = userData?.category || 'Product';
    
    return {
      headline: productName,
      subtext: `Premium ${category}`,
    };
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(templates.filter(t => t.category === activeCategory));
    }
  }, [activeCategory, templates]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTemplates();
      // Filter out video templates and limit to 6
      const filteredData = data.filter(template => template.category !== 'video');
      const limitedData = filteredData.slice(0, 6);
      setTemplates(limitedData);
      setFilteredTemplates(limitedData);
    } catch (err) {
      console.error('Error loading templates:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || 'Failed to load templates';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateClick = (template) => {
    // Just select the template, don't open editor
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No templates found in this category
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              onClick={() => handleTemplateClick(template)}
              className={`relative border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplateId === template.id
                  ? 'border-blue-600 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              {/* Selection Indicator */}
              {selectedTemplateId === template.id && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1.5 z-10 shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              )}

              {/* Premium Badge */}
              {template.isPremium && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded">
                  PREMIUM
                </div>
              )}

              {/* Template Preview */}
              <div className="bg-white rounded-lg h-40 mb-4 border border-gray-300 overflow-hidden relative">
                {/* Dynamic preview based on template type */}
                {template.category === 'social' && template.layout?.aspectRatio === '9:16' && (
                  <div className="h-full flex flex-col p-2 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="bg-white rounded h-6 mb-2 shadow-sm"></div>
                    <div className="flex-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded mb-2"></div>
                    <div className="bg-white rounded h-8 shadow-sm"></div>
                  </div>
                )}
                {template.category === 'social' && template.layout?.aspectRatio === '1:1' && (
                  <div className="h-full flex flex-col p-2 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 rounded mb-2"></div>
                    <div className="bg-white rounded h-8 shadow-sm"></div>
                    <div className="bg-white rounded h-6 mt-1 shadow-sm"></div>
                  </div>
                )}
                {template.category === 'social' && template.layout?.aspectRatio === '4:3' && (
                  <div className="h-full flex flex-col p-2 bg-gradient-to-br from-blue-50 to-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="flex-1 bg-white rounded h-6 shadow-sm"></div>
                    </div>
                    <div className="flex-1 bg-white rounded shadow-sm p-2">
                      <div className="bg-gray-200 h-2 rounded mb-1"></div>
                      <div className="bg-gray-200 h-2 rounded w-3/4"></div>
                    </div>
                    <div className="bg-blue-500 rounded h-6 mt-2 shadow-sm"></div>
                  </div>
                )}
                {template.category === 'email' && (
                  <div className="h-full flex flex-col p-2 bg-white">
                    <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded h-8 mb-1"></div>
                    <div className="bg-gray-100 rounded h-16 mb-1"></div>
                    <div className="space-y-1 flex-1">
                      <div className="bg-gray-200 h-2 rounded"></div>
                      <div className="bg-gray-200 h-2 rounded w-5/6"></div>
                      <div className="bg-gray-200 h-2 rounded w-4/6"></div>
                    </div>
                    <div className="bg-gray-100 rounded h-6"></div>
                  </div>
                )}
                {template.category === 'display' && (
                  <div className="h-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="w-12 h-12 bg-orange-400 rounded"></div>
                    <div className="flex-1 mx-2 space-y-1">
                      <div className="bg-gray-700 h-3 rounded"></div>
                      <div className="bg-gray-500 h-2 rounded w-3/4"></div>
                    </div>
                    <div className="bg-orange-500 text-white rounded px-3 py-2 text-xs font-bold">CTA</div>
                  </div>
                )}
                {/* Fallback for unknown types */}
                {!['social', 'email', 'display'].includes(template.category) && (
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <Layout className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <h3 className={`font-semibold text-lg ${
                  selectedTemplateId === template.id ? 'text-blue-700' : 'text-white'
                }`}>{template.name}</h3>
                <p className="text-sm text-gray-300">{template.description}</p>
                
                {/* User Data Preview */}
                {userData?.productName && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs text-blue-700 font-medium">
                      Will customize for: <span className="font-bold">{userData.productName}</span>
                    </p>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                    {template.category}
                  </span>
                  {template.layout?.aspectRatio && (
                    <span className="text-xs text-gray-500">
                      {template.layout.aspectRatio}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
