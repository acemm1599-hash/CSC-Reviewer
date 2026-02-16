
import React, { useState } from 'react';
import { TOPICS } from '../constants';
import { Topic } from '../types';

const Downloads: React.FC = () => {
  const [previewTopic, setPreviewTopic] = useState<Topic | null>(null);

  const closePreview = () => setPreviewTopic(null);

  return (
    <div className="space-y-6 relative">
      <header>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Materials</h2>
        <p className="text-slate-500">Downloadable PDFs for offline study.</p>
      </header>

      <div className="space-y-3">
        {TOPICS.map(topic => (
          <div key={topic.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
             <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl font-bold">
               PDF
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{topic.title} Reviewer</h4>
                <p className="text-[10px] text-slate-400">2.4 MB • Updated Oct 2023</p>
             </div>
             <div className="flex space-x-2">
               <button 
                onClick={() => setPreviewTopic(topic)}
                className="bg-slate-50 text-indigo-600 px-3 py-2 rounded-xl text-xs font-bold border border-indigo-50 hover:bg-indigo-50 transition-all"
               >
                 Preview
               </button>
               <button className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-indigo-700 transition-all">
                 Download
               </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 text-9xl opacity-10">📥</div>
        <h3 className="text-xl font-bold mb-2">The Ultimate Cheat Sheet</h3>
        <p className="text-indigo-100 text-sm mb-6">A condensed summary of all topics, perfect for the morning of the exam.</p>
        <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform">
          Get All In One ZIP
        </button>
      </div>

      {/* Preview Modal */}
      {previewTopic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
            {/* Modal Header */}
            <div className="relative h-32 bg-indigo-600 p-6 flex items-end">
              <button 
                onClick={closePreview}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg transform translate-y-4">
                  {previewTopic.icon}
                </div>
                <div className="pb-1">
                  <h3 className="text-white font-bold text-xl leading-tight">{previewTopic.title}</h3>
                  <p className="text-indigo-100 text-xs">Reviewer Snapshot</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 pt-10 space-y-6">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Key Concepts covered</h4>
                <ul className="grid grid-cols-1 gap-3">
                  {['Fundamental principles and terminology', 'Advanced situational applications', 'Common Civil Service patterns', 'RA 6713 compliance focus'].map((point, i) => (
                    <li key={i} className="flex items-start space-x-3 text-sm text-slate-600">
                      <span className="text-indigo-500 font-bold mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Page 1 Sample</h4>
                <p className="text-xs italic text-slate-500 leading-relaxed">
                  "In the context of {previewTopic.title.toLowerCase()}, the most critical aspect for the Professional Level exam is the ability to synthesize information from multiple sources..."
                </p>
                <div className="mt-3 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-200" style={{ width: '40%' }}></div>
                </div>
                <p className="mt-2 text-[10px] text-slate-400 text-center">Page 1 of 24 (Preview Mode)</p>
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={closePreview}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button 
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-white bg-indigo-600 shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Download PDF
                </button>
              </div>
            </div>
            
            <div className="bg-indigo-50/50 p-4 text-center">
               <p className="text-[10px] text-indigo-400 font-medium">Verify your Project ID before submitting the final exam.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloads;
