
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_EXAMS } from '../constants';

const MockExams: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Mock Exams</h2>
        <p className="text-slate-500">8 Progressive stages to build your mastery.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_EXAMS.map((exam, i) => (
          <Link 
            key={exam.id} 
            to={`/exam-instructions/${exam.id}`}
            className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:border-indigo-200 transition-all active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                i < 2 ? 'bg-green-100 text-green-700' :
                i < 4 ? 'bg-blue-100 text-blue-700' :
                i < 6 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
              }`}>
                {exam.difficulty}
              </span>
              <span className="text-slate-300 font-serif text-2xl">#0{i + 1}</span>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-800 text-xl mb-1">{exam.title}</h3>
              <div className="flex items-center space-x-4 text-xs text-slate-400 font-bold">
                 <span className="flex items-center"><span className="mr-1">🕒</span> 3h 10m</span>
                 <span className="flex items-center"><span className="mr-1">❓</span> 170 Qs</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1,2,3].map(j => (
                  <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${exam.id}${j}/32/32`} alt="user" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-500">+12k</div>
              </div>
              <span className="bg-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MockExams;
