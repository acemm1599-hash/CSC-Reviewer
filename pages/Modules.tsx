
import React from 'react';
import { Link } from 'react-router-dom';
import { TOPICS } from '../constants';

const Modules: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Learning Modules</h2>
        <p className="text-slate-500">Comprehensive study guides for every CSC topic.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {TOPICS.map((topic, i) => (
          <Link 
            key={topic.id} 
            to={`/modules/${topic.id}`}
            className="group bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-5 hover:border-indigo-200 hover:shadow-md transition-all animate-in slide-in-from-left duration-500"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-indigo-50 transition-colors">
              {topic.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg">{topic.title}</h3>
              <p className="text-sm text-slate-400 line-clamp-1">{topic.description}</p>
              
              <div className="mt-3 flex items-center space-x-3">
                <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: i < 3 ? '100%' : i === 3 ? '45%' : '0%' }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {i < 3 ? 'Completed' : i === 3 ? '45% Done' : 'Not Started'}
                </span>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-indigo-400 transition-colors">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Modules;
