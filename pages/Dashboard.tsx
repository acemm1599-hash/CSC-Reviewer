
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TOPICS, MOCK_EXAMS } from '../constants';

const Dashboard: React.FC<{ user: any }> = ({ user }) => {
  const readinessScore = 65; // Simulated
  const streak = 4;
  const lessonsCompleted = 12;

  const stats = [
    { label: 'Login Streak', value: `${streak} Days`, icon: '🔥' },
    { label: 'Lessons Done', value: `${lessonsCompleted}`, icon: '✅' },
    { label: 'Mock Exams', value: '2', icon: '📝' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Mabuhay, {user?.name || 'Scholar'}!</h2>
            <p className="text-indigo-100">Ready to conquer the CSC exam?</p>
          </div>
          <div className="text-4xl">🎓</div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium">Exam Readiness Score</span>
            <span className="text-2xl font-bold">{readinessScore}%</span>
          </div>
          <div className="h-3 w-full bg-indigo-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 transition-all duration-1000" 
              style={{ width: `${readinessScore}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-indigo-100 italic">
            Keep practicing Logic and Numerical Reasoning to reach 85%+.
          </p>
        </div>
      </section>

      {/* AI Assistant Call to Action */}
      <Link to="/ai-coach" className="block bg-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative z-10 flex items-center space-x-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">✨</div>
           <div>
              <h3 className="font-bold">Chat with AI Study Coach</h3>
              <p className="text-slate-400 text-xs mt-1">"Analyze my weak areas and suggest a plan"</p>
           </div>
           <div className="flex-1 text-right text-indigo-400 font-bold group-hover:translate-x-2 transition-transform">→</div>
        </div>
      </Link>

      <div className="grid grid-cols-3 gap-3">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center">
            <span className="text-2xl block mb-1">{stat.icon}</span>
            <span className="text-lg font-bold block text-slate-800">{stat.value}</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Quick Study</h3>
          <Link to="/modules" className="text-indigo-600 text-sm font-semibold">View All</Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 -mx-1 px-1">
          {TOPICS.slice(0, 4).map(topic => (
            <Link 
              key={topic.id} 
              to={`/modules/${topic.id}`}
              className="flex-shrink-0 w-32 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-2 hover:border-indigo-200 transition-colors"
            >
              <span className="text-3xl">{topic.icon}</span>
              <span className="text-xs font-bold text-slate-700 leading-tight">{topic.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Upcoming Mock Exam</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold">
            03
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800">Exam 3: Competency Check</h4>
            <p className="text-slate-500 text-sm">Moderate Difficulty • 170 Qs</p>
          </div>
          <Link 
            to="/exam-instructions/exam-3"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md active:scale-95 transition-transform"
          >
            Start
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
