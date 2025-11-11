import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, X } from 'lucide-react';

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        result = await signup({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          companyName: formData.companyName || undefined
        });
      }

      if (result.success) {
        onClose();
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800/95 rounded-2xl shadow-2xl w-full max-w-md border border-teal-500/30 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/40">
              {isLogin ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-3xl font-bold text-teal-400 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-300">
              {isLogin ? 'Login to access your campaigns' : 'Sign up to start creating campaigns'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field (only for signup) */}
            {!isLogin && (
              <div>
                <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
              />
              {!isLogin && (
                <p className="text-xs text-slate-400 mt-2">Minimum 6 characters</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold text-lg shadow-xl hover:shadow-teal-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-teal-400"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle between login and signup */}
          <div className="mt-6 text-center">
            <p className="text-slate-300">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ name: '', email: '', password: '', companyName: '' });
                }}
                className="text-teal-400 font-semibold hover:text-teal-300 transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
          {/* Company name field (only for signup) */}
          {!isLogin && (
            <div className="mt-5">
              <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your company name (or existing)"
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
              />
              <p className="text-xs text-slate-400 mt-2">We'll create the company if it doesn't exist.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
