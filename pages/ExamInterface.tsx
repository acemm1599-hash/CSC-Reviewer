
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_EXAMS, EXAM_DURATION_SECONDS, TOPICS } from '../constants';

const ExamInterface: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const exam = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Generate mock questions for demonstration (normally fetched)
  const questions = useMemo(() => {
    return Array.from({ length: 170 }).map((_, i) => ({
      id: `q-${i}`,
      text: `Which of the following principles best describes the 'Code of Conduct and Ethical Standards for Public Officials and Employees' known as RA 6713? (Sample Question #${i + 1})`,
      options: [
        "Commitment to public interest",
        "Professionalism and Justness",
        "Responsiveness to the public",
        "All of the above"
      ],
      correctAnswerIndex: 3,
      topicId: TOPICS[i % TOPICS.length].id
    }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    const attemptId = Date.now().toString();
    const score = Object.keys(answers).length; // Simulated
    const results = {
      id: attemptId,
      examId,
      score,
      total: 170,
      answers,
      startTime: Date.now() - (EXAM_DURATION_SECONDS - timeLeft) * 1000,
      endTime: Date.now(),
      completed: true
    };
    localStorage.setItem(`attempt-${attemptId}`, JSON.stringify(results));
    navigate(`/exam-results/${attemptId}`);
  };

  const toggleFlag = () => {
    setFlagged(prev => prev.includes(currentIdx) ? prev.filter(i => i !== currentIdx) : [...prev, currentIdx]);
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex flex-col z-[100]">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-slate-800 rounded-lg"
          >
            📋
          </button>
          <div>
            <h2 className="text-sm font-bold truncate max-w-[120px]">{exam.title}</h2>
            <p className="text-[10px] text-slate-400 font-mono">Q: {currentIdx + 1} / 170</p>
          </div>
        </div>
        
        <div className={`px-4 py-1.5 rounded-full font-mono font-bold text-sm border-2 ${timeLeft < 600 ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-slate-800 border-slate-700 text-yellow-400'}`}>
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => { if(confirm('Submit exam?')) handleSubmit(); }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold"
        >
          Submit
        </button>
      </header>

      {/* Progress Line */}
      <div className="h-1 w-full bg-slate-200">
        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentIdx + 1) / 170) * 100}%` }} />
      </div>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {TOPICS.find(t => t.id === questions[currentIdx].topicId)?.title}
            </span>
            <button 
              onClick={toggleFlag}
              className={`p-2 rounded-full transition-colors ${flagged.includes(currentIdx) ? 'text-orange-500 bg-orange-50' : 'text-slate-300 hover:text-slate-400'}`}
            >
              🚩
            </button>
          </div>

          <p className="text-lg text-slate-800 font-medium mb-8 leading-relaxed">
            {questions[currentIdx].text}
          </p>

          <div className="space-y-3">
            {questions[currentIdx].options.map((option, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [currentIdx]: i })}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
                  answers[currentIdx] === i 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md' 
                  : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  answers[currentIdx] === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 text-sm">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <footer className="bg-white border-t border-slate-200 p-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <button 
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(prev => prev - 1)}
          className="px-6 py-3 rounded-2xl font-bold text-slate-400 disabled:opacity-30"
        >
          Previous
        </button>
        <button 
          onClick={() => {
            if (currentIdx < 169) {
              setCurrentIdx(prev => prev + 1);
            } else {
              handleSubmit();
            }
          }}
          className="bg-slate-900 text-white px-10 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          {currentIdx === 169 ? 'Finish' : 'Next Question'}
        </button>
      </footer>

      {/* Navigation Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[110] flex justify-end">
          <div className="w-80 bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Question Palette</h3>
              <button onClick={() => setIsSidebarOpen(false)} className="text-2xl text-slate-400">×</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold relative ${
                      currentIdx === i ? 'bg-indigo-600 text-white' : 
                      answers[i] !== undefined ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i + 1}
                    {flagged.includes(i) && <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full"></div>}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 space-y-1">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded"></div>
                  <span>Current Question</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-100 rounded"></div>
                  <span>Answered</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded"></div>
                  <span>Flagged for Review</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;
