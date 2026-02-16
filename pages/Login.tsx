
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC<{ onLogin: (user: any) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name: email.split('@')[0] || 'User', email, role: 'learner' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-xs mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Welcome Back</h2>
        <p className="text-slate-500">Log in to continue your journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. jose.rizal@gov.ph"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Sign In
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-500">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
