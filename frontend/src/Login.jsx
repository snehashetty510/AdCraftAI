import React, { useState } from 'react';
import { Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        setIsLoading(false);
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('adcraft_user', JSON.stringify({ email: formData.email }));
      onLogin();
    }, 800);
  };

  const handleDemoLogin = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      localStorage.setItem('adcraft_user', JSON.stringify({ email: 'demo@adcraft.ai' }));
      onLogin();
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '24px' }}>
      <div style={{ maxWidth: '448px', margin: '0 auto', paddingTop: '80px' }}>
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#14b8a6', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(20, 184, 166, 0.3)'
            }}>
              <Sparkles size={36} color="white" />
            </div>
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#14b8a6', margin: '0 0 8px 0' }}>
            AdCraft AI
          </h1>
          <p style={{ fontSize: '18px', color: '#5eead4', margin: 0 }}>
            Transform Ideas Into Viral Campaigns
          </p>
        </div>

        {/* Login Form */}
        <div style={{ 
          backgroundColor: '#1e293b', 
          borderRadius: '24px', 
          padding: '32px', 
          border: '1px solid rgba(20, 184, 166, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', marginTop: 0 }}>
            Welcome Back
          </h2>
          
          {error && (
            <div style={{ 
              padding: '12px', 
              backgroundColor: 'rgba(239, 68, 68, 0.2)', 
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#5eead4', fontWeight: '500', marginBottom: '8px' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} size={20} color="#14b8a6" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    paddingLeft: '44px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(20, 184, 166, 0.3)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#5eead4', fontWeight: '500', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} size={20} color="#14b8a6" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    paddingLeft: '44px',
                    paddingRight: '48px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                    border: '1px solid rgba(20, 184, 166, 0.3)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff size={20} color="#14b8a6" /> : <Eye size={20} color="#14b8a6" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', color: '#5eead4', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                Remember me
              </label>
              <a href="#" style={{ color: '#14b8a6', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#14b8a6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                marginBottom: '24px'
              }}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ flex: 1, borderTop: '1px solid #475569' }}></div>
            <span style={{ padding: '0 16px', color: '#94a3b8', fontSize: '14px' }}>OR</span>
            <div style={{ flex: 1, borderTop: '1px solid #475569' }}></div>
          </div>

          {/* Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#334155',
              color: 'white',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              marginBottom: '24px'
            }}
          >
            {isLoading ? 'Loading...' : 'Try Demo Account'}
          </button>

          {/* Sign Up Link */}
          <p style={{ textAlign: 'center', color: '#94a3b8', margin: 0 }}>
            Don't have an account?{' '}
            <a href="#" style={{ color: '#14b8a6', fontWeight: '600', textDecoration: 'none' }}>
              Sign up
            </a>
          </p>
        </div>

        {/* Footer */}
        <p style={{ marginTop: '24px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          © 2025 AdCraft AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
