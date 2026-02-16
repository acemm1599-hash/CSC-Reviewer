
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC<{ onSignup: (user: any) => void }> = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup({ name, email, role: 'learner' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-xs mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Get Started</h2>
        <p className="text-slate-500">Join the thousands of successful passers.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Full Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. Maria Clara"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="e.g. m.clara@gmail.com"
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
          Create Account
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
