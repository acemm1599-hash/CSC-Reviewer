
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PASSING_PERCENTAGE, TOPICS } from '../constants';

const ExamResults: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const results = JSON.parse(localStorage.getItem(`attempt-${attemptId}`) || '{}');

  const scorePercentage = (results.score / results.total) * 100;
  const isPass = scorePercentage >= PASSING_PERCENTAGE;

  const topicPerformance = TOPICS.slice(0, 5).map(topic => ({
    ...topic,
    score: Math.floor(Math.random() * 20) + 10,
    total: 30
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center">
        <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl shadow-xl ${isPass ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isPass ? '🏆' : '💪'}
        </div>
        <h2 className={`text-3xl font-bold font-serif ${isPass ? 'text-green-600' : 'text-slate-800'}`}>
          {isPass ? 'You Passed!' : 'Keep Pushing!'}
        </h2>
        <p className="text-slate-500">Professional Level Mock Exam</p>
      </header>

      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 -z-10 opacity-50"></div>
        
        <div className="grid grid-cols-2 gap-8 divide-x divide-slate-100">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Score</p>
            <p className="text-5xl font-extrabold text-slate-900">{results.score}<span className="text-2xl text-slate-300 font-normal">/{results.total}</span></p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Percentage</p>
            <p className={`text-5xl font-extrabold ${isPass ? 'text-indigo-600' : 'text-orange-600'}`}>{scorePercentage.toFixed(0)}%</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center space-x-12">
          <div className="text-center">
             <p className="text-xl font-bold text-slate-800">2h 45m</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Spent</p>
          </div>
          <div className="text-center">
             <p className="text-xl font-bold text-slate-800">{PASSING_PERCENTAGE}%</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Passing Rate</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <span className="mr-2">📊</span> Topic Breakdown
        </h3>
        <div className="space-y-4">
          {topicPerformance.map(perf => (
            <div key={perf.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-700">{perf.title}</span>
                <span className="text-sm font-bold text-slate-500">{perf.score}/{perf.total}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${perf.score/perf.total >= 0.8 ? 'bg-green-500' : 'bg-orange-400'}`} 
                  style={{ width: `${(perf.score/perf.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sticky bottom-4">
        <Link 
          to={`/exam-interface/${results.examId}`}
          className="bg-indigo-600 text-white py-4 rounded-2xl font-bold text-center shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
        >
          Retake Exam
        </Link>
        <div className="grid grid-cols-2 gap-4">
          <Link 
            to="/mock-exams"
            className="bg-white text-slate-600 border border-slate-200 py-4 rounded-2xl font-bold text-center hover:bg-slate-50 active:scale-95 transition-all"
          >
            All Exams
          </Link>
          <Link 
            to="/dashboard"
            className="bg-slate-900 text-white py-4 rounded-2xl font-bold text-center shadow-lg active:scale-95 transition-all"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;
