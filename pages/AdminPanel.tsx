
import React, { useState } from 'react';
import { TOPICS, MOCK_EXAMS } from '../constants';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'users'>('content');

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Admin Portal</h2>
        <p className="text-slate-500">Manage lessons, exams, and platform content.</p>
      </header>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
        {['content', 'analytics', 'users'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 px-6 text-sm font-bold rounded-xl whitespace-nowrap transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-indigo-600 p-6 rounded-3xl text-white flex justify-between items-center shadow-lg">
             <div>
               <h3 className="font-bold">Content Overview</h3>
               <p className="text-indigo-100 text-xs">Total Lessons: 48 • Total Questions: 1,360</p>
             </div>
             <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold shadow-md">
               Add New Lesson +
             </button>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            {TOPICS.map(topic => (
               <div key={topic.id} className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{topic.title}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">12 Lessons • 120 Qs</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600">✎</button>
                    <button className="p-2 text-slate-400 hover:text-red-600">✕</button>
                  </div>
               </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 gap-6">
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4">📈</div>
              <h3 className="font-bold text-xl text-slate-800">Pass Rate Trends</h3>
              <p className="text-slate-400 text-sm mb-6">User performance is up by 12% this month.</p>
              <div className="w-full h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 text-xs italic">
                Analytics Chart Area (D3 Visualization)
              </div>
           </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
               <tr>
                 <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Name</th>
                 <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Readiness</th>
                 <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Last Seen</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {[
                 { name: 'Juan Dela Cruz', ready: '82%', last: '2m ago' },
                 { name: 'Maria Santos', ready: '45%', last: '1h ago' },
                 { name: 'Antonio Luna', ready: '91%', last: 'Yesterday' },
                 { name: 'Teodora Alonzo', ready: '67%', last: '3d ago' },
               ].map((u, i) => (
                 <tr key={i} className="hover:bg-slate-50/50">
                    <td className="px-4 py-4 font-medium text-slate-800">{u.name}</td>
                    <td className="px-4 py-4">
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${parseInt(u.ready) > 80 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                         {u.ready}
                       </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-xs">{u.last}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
