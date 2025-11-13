import React, { useState } from 'react';
import { Sparkles, Image, MessageSquare, BarChart3, Wand2, FileText, TrendingUp, DollarSign, Instagram, Linkedin, Facebook, Twitter, LogOut, User, Shield, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import CompanyAdmin from './components/CompanyAdmin';
import TemplateGallery from './components/TemplateGallery';
import { generateCampaignImage } from './services/imageService';

export default function AdCraftAI() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    audience: '',
    tone: 'professional',
    platform: 'instagram',
    productDescription: '',
    keyFeatures: '',
    targetGoal: '',
    specialOffer: '',
    hashtags: ''
  });

  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('form');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCampaign = async () => {
    if (!selectedTemplate) {
      alert('Please select a template first!');
      return;
    }

    if (!formData.productName || !formData.category || !formData.audience) {
      alert('Please fill in at least Product Name, Category, and Target Audience!');
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating campaign with:', { selectedTemplate, formData });
      
      // Generate campaign image using Gemini
      const result = await generateCampaignImage(selectedTemplate, formData);
      
      console.log('Campaign generated:', result);
      
      setGeneratedContent({
        imageUrl: result.imageUrl,
        template: selectedTemplate,
        userData: formData,
        cloudinaryId: result.cloudinaryId,
        generatedContent: result.generatedContent
      });
      
      setIsGenerating(false);
      
      // Switch to results tab
      setActiveTab('results');
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error generating campaign:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert(`Failed to generate campaign image: ${error.response?.data?.message || error.message}`);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{backgroundColor: '#0a1628'}}>
      {/* Header - Hide on results page */}
      {activeTab !== 'results' && (
      <div className="w-full text-center py-16 px-4 border-b border-teal-500/20">
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
      )}

      {/* Tab Navigation - Hide on results page */}
      {activeTab !== 'results' && (
      <div className="container mx-auto px-4 mb-12 mt-12">
        <div className="flex gap-6 bg-slate-800/80 p-3 rounded-2xl border border-teal-500/30 shadow-xl max-w-6xl mx-auto">
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
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-5 px-10 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'templates'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
            } flex items-center justify-center gap-2`}
          >
            <Sparkles className="w-5 h-5" />
            Templates
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
          {isAuthenticated && (user?.role === 'company_admin' || user?.role === 'admin') && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-5 px-10 rounded-xl font-semibold text-lg transition-all ${
                activeTab === 'admin'
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/70 hover:text-white'
              } flex items-center justify-center gap-2`}
            >
              <Shield className="w-5 h-5" />
              Admin Panel
            </button>
          )}
        </div>
      </div>
      )}

      <div className="container mx-auto px-4 pb-16">

        {/* Step Indicators */}
        <div className="mb-8 flex items-center justify-center gap-4 md:gap-8">
          {/* Step 1: Details */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'form' ? 'bg-teal-500/20 border-2 border-teal-500' : 'bg-slate-700/30 border-2 border-slate-600'
            }`}>
              {formData.productName ? (
                <CheckCircle className="w-5 h-5 text-teal-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
              <span className={`font-semibold ${activeTab === 'form' ? 'text-teal-300' : 'text-slate-400'}`}>
                1. Details
              </span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          {/* Step 2: Template */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'templates' ? 'bg-teal-500/20 border-2 border-teal-500' : 'bg-slate-700/30 border-2 border-slate-600'
            }`}>
              {selectedTemplate ? (
                <CheckCircle className="w-5 h-5 text-teal-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
              <span className={`font-semibold ${activeTab === 'templates' ? 'text-teal-300' : 'text-slate-400'}`}>
                2. Template
              </span>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          {/* Step 3: Results */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'results' ? 'bg-teal-500/20 border-2 border-teal-500' : 'bg-slate-700/30 border-2 border-slate-600'
            }`}>
              {generatedContent ? (
                <CheckCircle className="w-5 h-5 text-teal-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400" />
              )}
              <span className={`font-semibold ${activeTab === 'results' ? 'text-teal-300' : 'text-slate-400'}`}>
                3. Results
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {activeTab === 'form' && (
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

              {/* Product Description */}
              <div className="lg:col-span-3">
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your product in detail..."
                  rows="3"
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>

              {/* Key Features */}
              <div className="lg:col-span-2">
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Key Features
                </label>
                <input
                  type="text"
                  name="keyFeatures"
                  value={formData.keyFeatures}
                  onChange={handleInputChange}
                  placeholder="e.g., Fast, Affordable, Eco-friendly"
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>

              {/* Target Goal */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Campaign Goal
                </label>
                <select
                  name="targetGoal"
                  value={formData.targetGoal}
                  onChange={handleInputChange}
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg transition-all hover:border-teal-500/50"
                >
                  <option value="" className="bg-slate-800">Select goal</option>
                  <option value="awareness" className="bg-slate-800">Brand Awareness</option>
                  <option value="engagement" className="bg-slate-800">Engagement</option>
                  <option value="sales" className="bg-slate-800">Drive Sales</option>
                  <option value="leads" className="bg-slate-800">Generate Leads</option>
                  <option value="traffic" className="bg-slate-800">Website Traffic</option>
                </select>
              </div>

              {/* Special Offer */}
              <div className="lg:col-span-2">
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Special Offer (Optional)
                </label>
                <input
                  type="text"
                  name="specialOffer"
                  value={formData.specialOffer}
                  onChange={handleInputChange}
                  placeholder="e.g., 30% off, Free shipping"
                  className="w-full px-6 py-5 bg-slate-900/80 border-2 border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white text-lg placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>

              {/* Hashtags */}
              <div>
                <label className="block text-teal-400 font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Hashtags
                </label>
                <input
                  type="text"
                  name="hashtags"
                  value={formData.hashtags}
                  onChange={handleInputChange}
                  placeholder="#YourBrand #Trending"
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
                    className={`p-6 transition-all duration-300 ${
                      formData.platform === 'instagram'
                        ? 'text-pink-400 scale-110'
                        : 'text-slate-400 hover:text-pink-400 hover:scale-105'
                    }`}
                  >
                    <Instagram className="w-14 h-14 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Instagram</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'linkedin'})}
                    className={`p-6 transition-all duration-300 ${
                      formData.platform === 'linkedin'
                        ? 'text-blue-400 scale-110'
                        : 'text-slate-400 hover:text-blue-400 hover:scale-105'
                    }`}
                  >
                    <Linkedin className="w-14 h-14 mx-auto mb-2" />
                    <p className="text-sm font-semibold">LinkedIn</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'facebook'})}
                    className={`p-6 transition-all duration-300 ${
                      formData.platform === 'facebook'
                        ? 'text-blue-500 scale-110'
                        : 'text-slate-400 hover:text-blue-500 hover:scale-105'
                    }`}
                  >
                    <Facebook className="w-14 h-14 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Facebook</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, platform: 'twitter'})}
                    className={`p-6 transition-all duration-300 ${
                      formData.platform === 'twitter'
                        ? 'text-sky-400 scale-110'
                        : 'text-slate-400 hover:text-sky-400 hover:scale-105'
                    }`}
                  >
                    <Twitter className="w-14 h-14 mx-auto mb-2" />
                    <p className="text-sm font-semibold">Twitter</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Template Selection Info */}
            {selectedTemplate && (
              <div className="bg-teal-500/10 border-2 border-teal-500/30 rounded-xl p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-teal-400" />
                    <div>
                      <p className="text-teal-300 font-semibold text-lg">{selectedTemplate.name}</p>
                      <p className="text-teal-200/70 text-sm">Template selected - Your content will use this style</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-teal-300 rounded-lg transition-all text-sm font-medium"
                  >
                    Change Template
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      {/* Results Section */}
      {activeTab === 'results' && generatedContent && (
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl text-center">
              <h2 className="text-4xl font-bold text-teal-400 mb-2">🎉 Campaign Generated Successfully!</h2>
              <p className="text-slate-300">Here's your complete marketing campaign content</p>
            </div>

            {/* Generated Image */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
              <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                <Image className="w-6 h-6" />
                Generated Poster
              </h3>
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-teal-500/30">
                <img 
                  src={generatedContent.imageUrl} 
                  alt="Generated Campaign"
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>

            {/* Marketing Content */}
            {generatedContent.generatedContent && (
              <>
                {/* Ad Copy */}
                <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                  <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                    <FileText className="w-6 h-6" />
                    Ad Copy
                  </h3>
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
                    <p className="text-white leading-relaxed text-lg">
                      {generatedContent.userData.productDescription || 
                      `${generatedContent.userData.productName} - ${generatedContent.userData.keyFeatures || 'Premium quality product'} designed for ${generatedContent.userData.audience}. ${generatedContent.userData.specialOffer || 'Available now!'}`}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-sm">
                        <strong>Product:</strong> {generatedContent.userData.productName} | 
                        <strong className="ml-2">Category:</strong> {generatedContent.userData.category} | 
                        <strong className="ml-2">Platform:</strong> {generatedContent.userData.platform}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slogan/Tagline */}
                {generatedContent.generatedContent.slogan && (
                  <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                    <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Brand Slogan
                    </h3>
                    <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl p-8 border-2 border-teal-500/50">
                      <p className="text-white text-2xl font-bold text-center italic leading-relaxed">
                        "{generatedContent.generatedContent.slogan}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Tagline-Style Captions */}
                {generatedContent.generatedContent.captions && generatedContent.generatedContent.captions.length > 0 && (
                  <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                    <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      Tagline-Style Captions
                    </h3>
                    <div className="space-y-4">
                      {generatedContent.generatedContent.captions.map((caption, index) => (
                        <div key={index} className="bg-gradient-to-r from-slate-900/80 to-slate-800/50 rounded-xl p-6 border border-teal-500/30 hover:border-teal-400 transition-all group">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <span className="bg-teal-500 text-white font-bold px-3 py-1 rounded-lg text-sm">
                                {index === 0 ? 'Punchy' : index === 1 ? 'Catchy' : 'Engaging'}
                              </span>
                            </div>
                            <p className="text-white flex-1 leading-relaxed text-lg font-medium group-hover:text-teal-100 transition-colors">
                              {caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Media Captions */}
                {generatedContent.generatedContent.captions && generatedContent.generatedContent.captions.length > 0 && (
                  <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                    <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                      <MessageSquare className="w-6 h-6" />
                      Social Media Captions
                    </h3>
                    <div className="space-y-4">
                      {generatedContent.generatedContent.captions.map((caption, index) => (
                        <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-slate-600 hover:border-teal-500/50 transition-all">
                          <div className="flex items-start gap-4">
                            <span className="bg-teal-500/20 text-teal-300 font-bold px-3 py-1 rounded-lg text-sm">
                              {index === 0 ? 'Short' : index === 1 ? 'Medium' : 'Long'}
                            </span>
                            <p className="text-white flex-1 leading-relaxed">{caption}</p>
                          </div>
                          {generatedContent.generatedContent.hashtags && (
                            <div className="mt-4 pt-4 border-t border-slate-700 flex flex-wrap gap-2">
                              {generatedContent.generatedContent.hashtags.slice(0, 5).map((tag, tagIndex) => (
                                <span key={tagIndex} className="text-teal-400 text-sm">
                                  {tag.startsWith('#') ? tag : `#${tag}`}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Poster Prompt */}
                {generatedContent.dallePrompt && (
                  <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                    <h3 className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                      <Wand2 className="w-6 h-6" />
                      AI Poster Prompt
                    </h3>
                    <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-600">
                      <p className="text-slate-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                        {generatedContent.dallePrompt}
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm mt-4">
                      This is the AI prompt that was used to generate your poster image using DALL-E 3
                    </p>
                  </div>
                )}

                {/* Hashtags & CTA Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* All Hashtags */}
                  {generatedContent.generatedContent.hashtags && generatedContent.generatedContent.hashtags.length > 0 && (
                    <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                      <h3 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        All Hashtags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.generatedContent.hashtags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-2 bg-teal-500/20 text-teal-300 rounded-lg text-sm border border-teal-500/30 hover:bg-teal-500/30 transition-all cursor-pointer"
                          >
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  {generatedContent.generatedContent.callToAction && (
                    <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
                      <h3 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Call to Action
                      </h3>
                      <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold px-8 py-4 rounded-xl text-center text-lg shadow-lg">
                        {generatedContent.generatedContent.callToAction}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveTab('form')}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-teal-500/50 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Create New Campaign
                </button>
                <button
                  onClick={generateCampaign}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-teal-300 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Wand2 className="w-5 h-5" />
                  {isGenerating ? 'Generating...' : 'Generate Variations'}
                </button>
                <a
                  href={generatedContent.imageUrl}
                  download={`${generatedContent.userData.productName.replace(/\s+/g, '_')}_campaign.png`}
                  className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-teal-300 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Image className="w-5 h-5" />
                  Download Image
                </a>
              </div>
            </div>
          </div>
        )

        }

        {/* Templates Section */}
        {activeTab === 'templates' && (
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-16 border border-teal-500/40 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-teal-400" />
                <h2 className="text-4xl font-bold text-teal-400">Choose a Template</h2>
              </div>
              
              {/* User Guidance */}
              {!formData.productName && (
                <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 text-center">
                    💡 <strong>Tip:</strong> Fill in your product details in the Campaign Builder first for personalized templates!
                  </p>
                </div>
              )}
              
              {selectedTemplate && (
                <div className="mb-6 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                  <p className="text-teal-300">
                    <strong>Selected:</strong> {selectedTemplate.name}
                    {formData.productName && <span className="ml-2">• Customized for: <strong>{formData.productName}</strong></span>}
                  </p>
                </div>
              )}
              <TemplateGallery 
                onSelectTemplate={setSelectedTemplate} 
                selectedTemplateId={selectedTemplate?.id}
                userData={formData}
              />

              {/* Generate Campaign Button - Appears after template selection */}
              {selectedTemplate && (
                <div className="max-w-3xl mx-auto mt-12">
                  <button
                    onClick={generateCampaign}
                    disabled={isGenerating || !formData.productName}
                    className="w-full py-7 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-teal-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 border-2 border-teal-400"
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
                  {!formData.productName && (
                    <p className="text-yellow-300 text-center mt-4">
                      ⚠️ Please fill in your product details in the Campaign Builder first
                    </p>
                  )}
                </div>
              )}
            </div>
        )

        }

        {/* Admin Panel Section */}
        {activeTab === 'admin' && isAuthenticated && (user?.role === 'company_admin' || user?.role === 'admin') && (
          <CompanyAdmin />
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  );
}
