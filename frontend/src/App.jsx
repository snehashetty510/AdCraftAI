import React, { useState } from 'react';
import { Sparkles, Image, MessageSquare, BarChart3, Wand2, FileText, TrendingUp, DollarSign, Instagram, Linkedin, Facebook, Twitter, LogOut, User } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Auth from './components/Auth';

export default function AdCraftAI() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    audience: '',
    tone: 'professional',
    platform: 'instagram'
  });

  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCampaign = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic content
    setTimeout(() => {
      const mockContent = {
        adCopies: [
          `${formData.productName ? formData.productName + ': ' : ''}Elevate Your Brand with Innovation`,
          `Discover the Ultimate Solution - Limited Time Offer!`,
          `Join Thousands Who Already Chose ${formData.productName || 'Our Product'}`
        ],
        slogans: [
          `Innovation Meets Excellence`,
          `Your Success, Our Mission`,
          `Experience the ${formData.productName || 'Future'} Today`
        ],
        headlines: [
          `${formData.productName || 'Product'} - Where Quality Meets Innovation`,
          `Transform Your Business with Smart Solutions`,
          `The Solution ${formData.audience || 'Everyone'} Is Talking About`
        ],
        captions: {
          instagram: `✨ Excited to introduce ${formData.productName || 'our latest innovation'}! 🎉\n\nPerfect for ${formData.audience || 'everyone'} who wants to level up. 💪\n\n#${formData.productName?.replace(/\s/g, '') || 'Innovation'} #${formData.category || 'NewProduct'} #GameChanger`,
          
          linkedin: `I'm thrilled to share ${formData.productName || 'our new solution'} - designed specifically for ${formData.audience || 'professionals'} facing modern challenges.\n\nWe believe in delivering real value and exceptional results.\n\nAvailable now.\n\n#${formData.category || 'Business'} #Innovation #Technology`,
          
          facebook: `🎯 Attention ${formData.audience || 'everyone'}! \n\nLooking for something special? We've got you covered!\n\nIntroducing ${formData.productName || 'our solution'} - the smart way to succeed.\n\nClick to learn more! 👇`
        },
        posterPrompt: `Create a modern, professional advertising poster for "${formData.productName || 'Product'}" featuring ${formData.tone || 'professional'} styling. Include vibrant colors, ${formData.category || 'product'} imagery, and compelling visuals. Style: ${formData.tone}, clean layout, eye-catching design.`,
        
        budget: {
          recommended: 165000,
          breakdown: [
            { channel: 'Social Media Ads', amount: 66000, percentage: 40 },
            { channel: 'Google Ads', amount: 49500, percentage: 30 },
            { channel: 'Influencer Marketing', amount: 33000, percentage: 20 },
            { channel: 'Content Creation', amount: 16500, percentage: 10 }
          ],
          roi: '250-350%',
          duration: '30 days'
        },
        
        variations: 3
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      setActiveTab('results');
    }, 2000);
  };

  return (
    <div className="min-h-screen text-white w-full" style={{backgroundColor: '#0a1628'}}>
      {/* Header */}
      <div className="text-center py-16 px-8 border-b border-teal-500/20">
        <div className="flex items-center justify-center gap-5 mb-6">
          <div className="w-20 h-20 bg-teal-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/40">
            <Sparkles className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-7xl font-bold text-teal-400">
            AdCraft AI
          </h1>
        </div>
        <p className="text-slate-300 text-xl max-w-2xl mx-auto font-medium tracking-wide">
          Create. Craft. Convert.
        </p>
        <p className="text-teal-200/70 text-sm mt-3 uppercase tracking-widest">
          AI-Powered Marketing in Seconds
        </p>

        {/* Auth buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-lg border border-teal-500/30">
                <User className="w-5 h-5 text-teal-400" />
                <span className="text-teal-200 font-medium">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg transition-all font-semibold"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-teal-500/50 border-2 border-teal-400"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-8 mb-12 mt-12">
        <div className="flex gap-6 bg-slate-800/80 p-3 rounded-2xl border border-teal-500/30 shadow-xl">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-5 px-10 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'form'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
            }`}
          >
            Campaign Builder
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-5 px-10 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'results'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
            } ${!generatedContent && 'opacity-50 cursor-not-allowed'}`}
            disabled={!generatedContent}
          >
            Generated Content
          </button>
        </div>
      </div>

      <div className="px-8 pb-16">

        {/* Form Section */}
        {activeTab === 'form' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-16 border border-teal-500/40 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-12">
                <Wand2 className="w-8 h-8 text-teal-400" />
                <h2 className="text-4xl font-bold text-teal-400">Build Your Campaign</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">
              {/* Product Name */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter your product name"
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg transition-all hover:border-teal-500/50"
                >
                  <option value="" className="bg-slate-800">Select category</option>
                  <option value="technology" className="bg-slate-800">Technology</option>
                  <option value="fashion" className="bg-slate-800">Fashion</option>
                  <option value="food" className="bg-slate-800">Food & Beverage</option>
                  <option value="health" className="bg-slate-800">Health & Wellness</option>
                  <option value="education" className="bg-slate-800">Education</option>
                  <option value="finance" className="bg-slate-800">Finance</option>
                </select>
              </div>

              {/* Audience */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Target Audience
                </label>
                <input
                  type="text"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="Who are they?"
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Tone & Style
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg transition-all hover:border-teal-500/50"
                >
                  <option value="professional" className="bg-slate-800">Professional</option>
                  <option value="funny" className="bg-slate-800">Funny</option>
                  <option value="emotional" className="bg-slate-800">Emotional</option>
                  <option value="luxury" className="bg-slate-800">Luxury</option>
                  <option value="trendy" className="bg-slate-800">Trendy</option>
                </select>
              </div>

              {/* Platform */}
              <div className="lg:col-span-3">
                <label className="block text-teal-400 font-bold mb-6 text-sm uppercase tracking-wider text-center">Select Primary Platform</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'instagram'})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      formData.platform === 'instagram'
                        ? 'bg-pink-500/30 border-pink-500 text-pink-300 shadow-2xl shadow-pink-500/40'
                        : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-pink-500 hover:bg-slate-800/80 hover:text-pink-400'
                    }`}
                  >
                    <Instagram className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-base font-bold">Instagram</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'linkedin'})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      formData.platform === 'linkedin'
                        ? 'bg-blue-500/30 border-blue-500 text-blue-300 shadow-2xl shadow-blue-500/40'
                        : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-blue-500 hover:bg-slate-800/80 hover:text-blue-400'
                    }`}
                  >
                    <Linkedin className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-base font-bold">LinkedIn</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'facebook'})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      formData.platform === 'facebook'
                        ? 'bg-blue-600/30 border-blue-600 text-blue-300 shadow-2xl shadow-blue-600/40'
                        : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-blue-600 hover:bg-slate-800/80 hover:text-blue-300'
                    }`}
                  >
                    <Facebook className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-base font-bold">Facebook</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'twitter'})}
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      formData.platform === 'twitter'
                        ? 'bg-sky-500/30 border-sky-500 text-sky-300 shadow-2xl shadow-sky-500/40'
                        : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:border-sky-500 hover:bg-slate-800/80 hover:text-sky-400'
                    }`}
                  >
                    <Twitter className="w-12 h-12 mx-auto mb-3" />
                    <p className="text-base font-bold">Twitter</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="max-w-3xl mx-auto mt-8">
              <button
                onClick={generateCampaign}
                disabled={isGenerating}
                className="w-full py-7 bg-teal-500 hover:bg-teal-600 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-teal-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 border-2 border-teal-400"
              >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Your Campaign...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  Generate Complete Campaign
                </>
              )}
            </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {activeTab === 'results' && generatedContent && (
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Ad Copies */}
          <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-teal-500/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-7 h-7 text-teal-400" />
              <h2 className="text-3xl font-bold text-teal-300">Ad Copy Variations</h2>
            </div>
            <div className="grid gap-3">
              {generatedContent.adCopies.map((copy, idx) => (
                <div key={idx} className="p-4 bg-slate-700/50 rounded-lg border border-teal-500/20">
                  <p className="text-white">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Slogans & Headlines */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-bold text-teal-300">Catchy Slogans</h2>
              </div>
              <div className="space-y-2">
                {generatedContent.slogans.map((slogan, idx) => (
                  <div key={idx} className="p-3 bg-slate-700/50 rounded-lg text-teal-100">
                    {slogan}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-6 border border-teal-500/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-bold text-teal-300">Headlines</h2>
              </div>
              <div className="space-y-2">
                {generatedContent.headlines.map((headline, idx) => (
                  <div key={idx} className="p-3 bg-slate-700/50 rounded-lg text-teal-100">
                    {headline}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Captions */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-teal-500/20">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-teal-300">Social Media Captions</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-700/50 rounded-lg border border-pink-500/30">
                <h3 className="font-semibold text-pink-400 mb-2">Instagram</h3>
                <p className="text-sm text-white whitespace-pre-line">{generatedContent.captions.instagram}</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-500/30">
                <h3 className="font-semibold text-blue-400 mb-2">LinkedIn</h3>
                <p className="text-sm text-white whitespace-pre-line">{generatedContent.captions.linkedin}</p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg border border-blue-600/30">
                <h3 className="font-semibold text-blue-300 mb-2">Facebook</h3>
                <p className="text-sm text-white whitespace-pre-line">{generatedContent.captions.facebook}</p>
              </div>
            </div>
          </div>

          {/* Poster Prompt */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-teal-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-teal-300">AI Poster Generation Prompt</h2>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg border border-teal-500/20">
              <p className="text-white mb-3">{generatedContent.posterPrompt}</p>
              <p className="text-teal-300 text-sm">
                Use this prompt with DALL·E, Stable Diffusion, or Midjourney to create your poster
              </p>
            </div>
          </div>

          {/* Marketing Budget Analysis */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-teal-500/20">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-teal-300">Marketing Budget Analysis</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <p className="text-teal-200 mb-3 text-lg">Recommended Budget</p>
                  <p className="text-5xl font-bold text-white">₹{generatedContent.budget.recommended.toLocaleString('en-IN')}</p>
                  <p className="text-base text-teal-300 mt-2">for {generatedContent.budget.duration}</p>
                </div>
                <div>
                  <p className="text-teal-200 mb-3 text-lg">Expected ROI</p>
                  <p className="text-3xl font-bold text-green-400">{generatedContent.budget.roi}</p>
                </div>
              </div>
              <div>
                <p className="text-teal-200 mb-4 text-lg">Budget Breakdown</p>
                <div className="space-y-3">
                  {generatedContent.budget.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <span className="text-white text-base">{item.channel}</span>
                      <div className="text-right">
                        <p className="text-teal-300 font-semibold text-lg">₹{item.amount.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-teal-400">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Variations Info */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-8 border border-teal-500/20">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-6 h-6 text-teal-400" />
              <h3 className="text-xl font-bold text-teal-300">A/B Testing Ready</h3>
            </div>
            <p className="text-white">
              {generatedContent.variations} variations generated for optimal A/B testing. Test different versions to maximize campaign performance and engagement.
            </p>
          </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  );
}
