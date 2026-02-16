
import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-8">
      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center text-6xl animate-bounce">
        🇵🇭
      </div>
      <div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2 font-serif">CSC Master</h1>
        <p className="text-slate-500 max-w-xs mx-auto">
          The ultimate platform for passing the Philippine Civil Service Professional Exam with confidence.
        </p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
        <Link 
          to="/signup" 
          className="block w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Create Account
        </Link>
        <Link 
          to="/login" 
          className="block w-full bg-white text-slate-700 border border-slate-200 py-4 rounded-2xl font-bold hover:bg-slate-50 active:scale-95 transition-all"
        >
          Sign In
        </Link>
      </div>

      <div className="pt-10 flex space-x-6">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-slate-800">100%</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Complete</span>
        </div>
        <div className="w-px h-8 bg-slate-200"></div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-slate-800">8</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Exams</span>
        </div>
        <div className="w-px h-8 bg-slate-200"></div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-slate-800">1.3k+</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Questions</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
