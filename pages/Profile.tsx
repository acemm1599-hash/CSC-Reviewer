
import React from 'react';

const Profile: React.FC<{ user: any, onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <div className="space-y-8 pb-10">
      <header className="text-center pt-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-inner ring-4 ring-white">
          {user?.name?.[0].toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
        <p className="text-slate-500 text-sm">{user?.email}</p>
        <span className="mt-3 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full uppercase tracking-widest">
           Premium Scholar
        </span>
      </header>

      <section className="grid grid-cols-2 gap-4">
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-3xl font-bold text-indigo-600">84%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Best Score</p>
         </div>
         <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
            <p className="text-3xl font-bold text-orange-600">18</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours Studied</p>
         </div>
      </section>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
         <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
         <div className="space-y-6">
           {[
             { title: 'Full CSC Simulation', desc: 'Attempted 170 Qs', score: '72/170', time: '2h ago', type: 'exam' },
             { title: 'Numerical Reasoning', desc: 'Completed Lesson', score: 'Done', time: '5h ago', type: 'lesson' },
             { title: 'Vocabulary Quiz', desc: 'Practice Mode', score: '9/10', time: '1d ago', type: 'quiz' },
           ].map((act, i) => (
             <div key={i} className="flex items-start space-x-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.type === 'exam' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                 {act.type === 'exam' ? '📝' : '📖'}
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-800">{act.title}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{act.time}</span>
                 </div>
                 <p className="text-xs text-slate-400">{act.desc}</p>
               </div>
               <span className="text-xs font-bold text-slate-900">{act.score}</span>
             </div>
           ))}
         </div>
      </section>

      <div className="space-y-3">
        <button className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
          Settings & Preferences
        </button>
        <button 
          onClick={onLogout}
          className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-100 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
