import { useState, useEffect } from 'react';
import { X, Type, Image as ImageIcon, Palette } from 'lucide-react';

export default function TemplateEditor({ template, userData, onClose }) {
  // Generate dynamic content based on user input
  const generateDynamicContent = () => {
    const productName = userData?.productName || 'Your Product';
    const category = userData?.category || 'Product';
    const audience = userData?.audience || 'customers';
    const tone = userData?.tone || 'professional';
    const platform = userData?.platform || 'social media';

    // Generate context-aware headlines and content
    const headlines = {
      professional: `Elevate Your Experience with ${productName}`,
      casual: `Check Out ${productName}! 🎉`,
      luxury: `Experience Luxury with ${productName}`,
      playful: `Get Ready to Love ${productName}! ✨`
    };

    const subheadlines = {
      professional: `Premium ${category} for ${audience}`,
      casual: `Perfect ${category} for ${audience}!`,
      luxury: `Crafted Exclusively for ${audience}`,
      playful: `The ${category} You've Been Waiting For!`
    };

    const bodies = {
      professional: `Discover how ${productName} transforms your ${category} experience. Designed specifically for ${audience} who demand excellence.`,
      casual: `${productName} is here to make your life easier! Perfect for ${audience} looking for quality ${category}.`,
      luxury: `Indulge in the finest ${category}. ${productName} delivers unmatched sophistication for discerning ${audience}.`,
      playful: `${productName} brings the fun! Join ${audience} everywhere who are already loving this amazing ${category}!`
    };

    const ctas = {
      professional: 'Learn More',
      casual: 'Get Started Now!',
      luxury: 'Explore Collection',
      playful: 'Join the Fun!'
    };

    return {
      headline: headlines[tone] || headlines.professional,
      subheadline: subheadlines[tone] || subheadlines.professional,
      body: bodies[tone] || bodies.professional,
      cta: ctas[tone] || ctas.professional,
      logoUrl: '',
    };
  };

  const [content, setContent] = useState(generateDynamicContent());

  // Update content when userData changes
  useEffect(() => {
    setContent(generateDynamicContent());
  }, [userData?.productName, userData?.category, userData?.audience, userData?.tone]);

  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#FFFFFF',
    text: '#000000',
  });

  const handleContentChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleColorChange = (field, value) => {
    setColors(prev => ({ ...prev, [field]: value }));
  };

  const renderTemplatePreview = () => {
    const aspectRatio = template.layout?.aspectRatio || '1:1';
    
    // Calculate dimensions
    let width = 600;
    let height = 600;
    
    if (aspectRatio === '9:16') {
      width = 400;
      height = 711;
    } else if (aspectRatio === '16:9') {
      width = 800;
      height = 450;
    } else if (aspectRatio === '4:3') {
      width = 600;
      height = 450;
    }

    const baseStyle = {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: colors.background,
      color: colors.text,
    };

    // Render based on category
    if (template.category === 'social') {
      if (aspectRatio === '9:16') {
        return (
          <div style={baseStyle} className="flex flex-col p-8 relative">
            {content.logoUrl && (
              <div className="mb-4">
                <img src={content.logoUrl} alt="Logo" className="h-12 object-contain" />
              </div>
            )}
            <div 
              className="flex-1 flex items-center justify-center rounded-lg mb-6"
              style={{ backgroundColor: colors.primary }}
            >
              <h1 className="text-4xl font-bold text-white text-center px-4">
                {content.headline}
              </h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg mb-2" style={{ color: colors.text }}>
                {content.subheadline}
              </p>
              <button 
                className="w-full py-3 rounded-lg font-bold text-white text-lg"
                style={{ backgroundColor: colors.secondary }}
              >
                {content.cta}
              </button>
            </div>
          </div>
        );
      } else if (aspectRatio === '1:1') {
        return (
          <div style={baseStyle} className="flex flex-col p-8">
            <div 
              className="flex-1 flex flex-col items-center justify-center rounded-lg mb-6 p-6"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              {content.logoUrl && (
                <img src={content.logoUrl} alt="Logo" className="h-16 object-contain mb-4" />
              )}
              <h1 className="text-3xl font-bold text-white text-center mb-2">
                {content.headline}
              </h1>
              <p className="text-white text-center text-lg">
                {content.subheadline}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="mb-3" style={{ color: colors.text }}>
                {content.body}
              </p>
              <button 
                className="w-full py-2 rounded-lg font-bold text-white"
                style={{ backgroundColor: colors.primary }}
              >
                {content.cta}
              </button>
            </div>
          </div>
        );
      } else if (aspectRatio === '4:3') {
        return (
          <div style={baseStyle} className="flex flex-col p-8">
            <div className="flex items-center mb-6">
              {content.logoUrl && (
                <img src={content.logoUrl} alt="Logo" className="h-12 object-contain mr-4" />
              )}
              <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
                {content.headline}
              </h1>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: colors.secondary }}>
                {content.subheadline}
              </h2>
              <p style={{ color: colors.text }}>
                {content.body}
              </p>
            </div>
            <button 
              className="py-3 px-8 rounded-lg font-bold text-white text-lg"
              style={{ backgroundColor: colors.primary }}
            >
              {content.cta}
            </button>
          </div>
        );
      }
    } else if (template.category === 'email') {
      return (
        <div style={baseStyle} className="flex flex-col">
          <div className="p-6" style={{ backgroundColor: colors.primary }}>
            {content.logoUrl && (
              <img src={content.logoUrl} alt="Logo" className="h-10 object-contain" />
            )}
          </div>
          <div 
            className="p-8 flex items-center justify-center"
            style={{ 
              minHeight: '200px',
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` 
            }}
          >
            <h1 className="text-4xl font-bold text-center" style={{ color: colors.primary }}>
              {content.headline}
            </h1>
          </div>
          <div className="p-8 flex-1">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.secondary }}>
              {content.subheadline}
            </h2>
            <p className="mb-6" style={{ color: colors.text }}>
              {content.body}
            </p>
            <button 
              className="py-3 px-8 rounded-lg font-bold text-white text-lg"
              style={{ backgroundColor: colors.secondary }}
            >
              {content.cta}
            </button>
          </div>
          <div className="p-4 bg-gray-100 text-center text-sm text-gray-600">
            Footer Information
          </div>
        </div>
      );
    } else if (template.category === 'display') {
      return (
        <div style={baseStyle} className="flex items-center justify-between p-6">
          {content.logoUrl && (
            <img src={content.logoUrl} alt="Logo" className="h-16 object-contain mr-4" />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
              {content.headline}
            </h1>
            <p className="text-sm" style={{ color: colors.text }}>
              {content.subheadline}
            </p>
          </div>
          <button 
            className="py-3 px-6 rounded-lg font-bold text-white ml-4 whitespace-nowrap"
            style={{ backgroundColor: colors.secondary }}
          >
            {content.cta}
          </button>
        </div>
      );
    }

    // Default fallback
    return (
      <div style={baseStyle} className="flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.primary }}>
          {content.headline}
        </h1>
        <p style={{ color: colors.text }}>{content.body}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{template.name}</h2>
            <p className="text-sm text-gray-600">Customize your content</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Content
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Headline
                    </label>
                    <input
                      type="text"
                      value={content.headline}
                      onChange={(e) => handleContentChange('headline', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subheadline
                    </label>
                    <input
                      type="text"
                      value={content.subheadline}
                      onChange={(e) => handleContentChange('subheadline', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body Text
                    </label>
                    <textarea
                      value={content.body}
                      onChange={(e) => handleContentChange('body', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Call-to-Action Button
                    </label>
                    <input
                      type="text"
                      value={content.cta}
                      onChange={(e) => handleContentChange('cta', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={content.logoUrl}
                      onChange={(e) => handleContentChange('logoUrl', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colors
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border border-gray-300"
                      />
                      <input
                        type="text"
                        value={colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[500px]">
                {renderTemplatePreview()}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
