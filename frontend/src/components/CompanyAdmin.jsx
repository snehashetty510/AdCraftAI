import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Crown, Building2, Mail, User, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import companyService from '../services/companyService';

const CompanyAdmin = () => {
  const [company, setCompany] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' });
  const [inviting, setInviting] = useState(false);
  const [tempPassword, setTempPassword] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [companyRes, usersRes] = await Promise.all([
        companyService.getMyCompany(),
        companyService.listUsers()
      ]);
      setCompany(companyRes.company);
      setUsers(usersRes.users);
    } catch (err) {
      setError(err.message || 'Failed to load company data');
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    setError('');
    setSuccess('');
    setTempPassword('');
    
    try {
      const response = await companyService.inviteUser(inviteForm);
      setSuccess(`User invited successfully! Temporary password: ${response.tempPassword}`);
      setTempPassword(response.tempPassword);
      setInviteForm({ name: '', email: '' });
      await loadData(); // Refresh user list
    } catch (err) {
      setError(err.message || 'Failed to invite user');
    } finally {
      setInviting(false);
    }
  };

  const handlePromote = async (userId) => {
    setError('');
    setSuccess('');
    try {
      await companyService.promoteUser(userId);
      setSuccess('User promoted to company admin successfully');
      await loadData(); // Refresh user list
    } catch (err) {
      setError(err.message || 'Failed to promote user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 border border-teal-500/40 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/40">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-teal-400">Company Admin</h1>
            <p className="text-slate-300">Manage your company and team members</p>
          </div>
        </div>

        {company && (
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-xl border border-teal-500/20">
              <p className="text-teal-400 text-sm font-semibold mb-1">Company Name</p>
              <p className="text-white text-xl font-bold">{company.name}</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl border border-teal-500/20">
              <p className="text-teal-400 text-sm font-semibold mb-1">Total Users</p>
              <p className="text-white text-xl font-bold">{company.userCount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-6 py-4 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6" />
          {success}
        </div>
      )}

      {/* Invite User Form */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-teal-500/30 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-7 h-7 text-teal-400" />
          <h2 className="text-3xl font-bold text-teal-300">Invite New User</h2>
        </div>

        <form onSubmit={handleInvite} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                placeholder="Enter user name"
                required
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
              />
            </div>

            <div>
              <label className="block text-teal-400 font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="Enter user email"
                required
                className="w-full px-4 py-3 bg-slate-900/80 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white placeholder-slate-500 transition-all hover:border-teal-500/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={inviting}
            className="w-full py-4 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-teal-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2 border-teal-400"
          >
            {inviting ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Send Invitation
              </>
            )}
          </button>
        </form>

        {tempPassword && (
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-200 font-semibold mb-2">⚠️ Important: Temporary Password</p>
            <p className="text-white font-mono text-lg bg-slate-900/80 px-4 py-2 rounded border border-yellow-500/30">
              {tempPassword}
            </p>
            <p className="text-yellow-200/80 text-sm mt-2">
              Share this password with the new user. They should change it after first login.
            </p>
          </div>
        )}
      </div>

      {/* Users List */}
      <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 border border-teal-500/30 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-7 h-7 text-teal-400" />
          <h2 className="text-3xl font-bold text-teal-300">Team Members</h2>
        </div>

        {users.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-5 bg-slate-700/50 rounded-xl border border-teal-500/20 hover:border-teal-500/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500/30 rounded-full flex items-center justify-center border-2 border-teal-500/50">
                      <User className="w-6 h-6 text-teal-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                        {user.role === 'company_admin' && (
                          <span className="px-2 py-1 bg-purple-500/30 border border-purple-500/50 text-purple-200 text-xs font-bold rounded flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            ADMIN
                          </span>
                        )}
                        {user.role === 'admin' && (
                          <span className="px-2 py-1 bg-red-500/30 border border-red-500/50 text-red-200 text-xs font-bold rounded flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            SUPER ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{user.email}</p>
                      <p className="text-slate-500 text-xs mt-1">
                        Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>

                  {user.role === 'user' && (
                    <button
                      onClick={() => handlePromote(user.id)}
                      className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-200 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Crown className="w-4 h-4" />
                      Promote to Admin
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyAdmin;
