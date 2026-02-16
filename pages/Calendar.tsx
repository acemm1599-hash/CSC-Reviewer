
import React from 'react';

const Calendar: React.FC = () => {
  const days = Array.from({ length: 31 }).map((_, i) => i + 1);
  const completedDays = [3, 4, 5, 8, 9, 10, 11, 12];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Study Planner</h2>
        <p className="text-slate-500">Track your daily progress and consistency.</p>
      </header>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-bold text-slate-800">October 2023</h3>
           <div className="flex space-x-2">
              <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center">←</button>
              <button className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center">→</button>
           </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d} className="text-center text-[10px] font-bold text-slate-400 mb-2">{d}</div>
          ))}
          {days.map(day => (
            <div 
              key={day} 
              className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                completedDays.includes(day) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                : day === 14 ? 'border-2 border-indigo-600 text-indigo-600' : 'bg-slate-50 text-slate-400'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
           <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Total Study Hours</p>
              <p className="text-2xl font-bold text-indigo-900">42.5 hrs</p>
           </div>
           <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Target Pass Date</p>
              <p className="text-2xl font-bold text-green-900">Nov 22</p>
           </div>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-800 mb-4">Daily Goals</h3>
        <div className="space-y-3">
          {[
            { label: 'Vocabulary Flashcards', status: 'done' },
            { label: 'RA 6713 Module Review', status: 'done' },
            { label: '1 Mock Exam Attempt', status: 'pending' },
            { label: 'Review Logic Errors', status: 'pending' },
          ].map((goal, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${goal.status === 'done' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200'}`}>
                  {goal.status === 'done' && '✓'}
                </div>
                <span className={`text-sm font-medium ${goal.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {goal.label}
                </span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${goal.status === 'done' ? 'text-green-500' : 'text-orange-500'}`}>
                {goal.status === 'done' ? 'Done' : 'Active'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Calendar;
