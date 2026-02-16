
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_EXAMS } from '../constants';

const ExamInstructions: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const exam = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];

  return (
    <div className="space-y-8 max-w-xl mx-auto py-10">
      <header className="text-center space-y-4">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-lg">
          📝
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{exam.title}</h2>
          <p className="text-slate-500">Difficulty: <span className="font-bold text-slate-700">{exam.difficulty}</span></p>
        </div>
      </header>

      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 className="font-bold text-slate-800 border-b border-slate-50 pb-2">Exam Rules</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">1</div>
             <p className="text-sm text-slate-600 flex-1">You have exactly <span className="font-bold">3 hours and 10 minutes</span> to complete 170 questions.</p>
          </div>
          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">2</div>
             <p className="text-sm text-slate-600 flex-1">The timer is persistent. Exiting the browser will NOT pause the exam.</p>
          </div>
          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">3</div>
             <p className="text-sm text-slate-600 flex-1">Auto-submission will occur when the timer hits 00:00:00.</p>
          </div>
          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">4</div>
             <p className="text-sm text-slate-600 flex-1">You can flag questions for review using the 🚩 icon.</p>
          </div>
          <div className="flex items-start space-x-3">
             <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">5</div>
             <p className="text-sm text-slate-600 flex-1">Ensure a stable internet connection for submission.</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col space-y-3">
        <button 
          onClick={() => navigate(`/exam-interface/${examId}`)}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Begin Exam
        </button>
        <Link 
          to="/mock-exams"
          className="w-full bg-white text-slate-500 py-4 rounded-2xl font-bold text-center border border-slate-100 hover:bg-slate-50 transition-all"
        >
          Maybe Later
        </Link>
      </div>
    </div>
  );
};

export default ExamInstructions;
