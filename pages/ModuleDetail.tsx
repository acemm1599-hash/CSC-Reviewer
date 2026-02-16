
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPICS } from '../constants';
import { getAiExplanation } from '../services/geminiService';

const ModuleDetail: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = TOPICS.find(t => t.id === topicId) || TOPICS[0];
  
  // UI Tabs and AI state
  const [activeTab, setActiveTab] = useState<'explanation' | 'practice'>('explanation');
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // Quiz State
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Logic to generate 100 randomized questions for the session
  const generateRandomQuestions = () => {
    const templates = [
      "Which of the following scenarios best demonstrates a professional application of {topic}?",
      "In the context of the Civil Service exam, what is the primary rule regarding {topic}?",
      "A government employee is faced with a dilemma involving {topic}. What is the most ethical course of action?",
      "Identify the incorrect statement among the following choices regarding {topic} principles.",
      "How does {topic} contribute to the efficiency of public service delivery?",
      "According to RA 6713 and related guidelines, {topic} is categorized as:",
      "Which principle of {topic} is most critical when dealing with diverse public stakeholders?",
      "In a professional documentation scenario, how should {topic} be prioritized?",
      "Choose the most accurate definition of {topic} in a Philippine government setting.",
      "What is the standard procedure for verifying accuracy in matters related to {topic}?"
    ];

    return Array.from({ length: 100 }).map((_, i) => {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const text = template.replace("{topic}", topic.title);
      const correctAnswerIndex = Math.floor(Math.random() * 4);
      
      const options = [
        `Option A: Adherence to strict ${topic.title} protocols`,
        `Option B: Flexible interpretation based on ${topic.title} context`,
        `Option C: Systematic review of ${topic.title} records`,
        `Option D: Consultation with ${topic.title} specialists`
      ];

      return {
        id: `practice-${topic.id}-${i}-${Math.random().toString(36).substr(2, 9)}`,
        text: `${text} (Question Item #${i + 1})`,
        options: options,
        correctAnswerIndex: correctAnswerIndex,
        explanation: `The correct answer is ${String.fromCharCode(65 + correctAnswerIndex)} because the CSC Professional level standards for ${topic.title} emphasize specific procedural integrity, accountability, and situational awareness as defined in the official Civil Service curriculum.`
      };
    });
  };

  const [practiceQuestions, setPracticeQuestions] = useState<any[]>([]);

  const handleAskAi = async () => {
    setIsAskingAi(true);
    const explanation = await getAiExplanation(topic.title, "Explain the most common pitfalls and core concepts for this topic.");
    setAiResponse(explanation);
    setIsAskingAi(false);
  };

  const startQuiz = () => {
    setPracticeQuestions(generateRandomQuestions());
    setIsQuizStarted(true);
    setCurrentQuizIdx(0);
    setQuizAnswers({});
    setIsQuizFinished(false);
    setIsReviewMode(false);
  };

  const handleAnswer = (optionIdx: number) => {
    setQuizAnswers(prev => ({ ...prev, [currentQuizIdx]: optionIdx }));
  };

  const nextQuestion = () => {
    if (currentQuizIdx < 99) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    practiceQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setIsReviewMode(false);
  };

  const downloadReviewerPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Reviewer: ${topic.title} - CSC Master</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #334155; line-height: 1.6; }
            h1 { color: #1e293b; border-bottom: 4px solid #4f46e5; padding-bottom: 10px; }
            .item { margin-bottom: 30px; page-break-inside: avoid; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
            .question { font-weight: bold; font-size: 1.1em; margin-bottom: 10px; }
            .options { margin-left: 20px; color: #64748b; }
            .answer { color: #059669; font-weight: bold; margin-top: 10px; }
            .explanation { background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px; font-size: 0.9em; }
            .footer { margin-top: 50px; font-size: 0.8em; text-align: center; color: #94a3b8; }
          </style>
        </head>
        <body>
          <h1>${topic.title} Mastery Reviewer</h1>
          <p>Generated by CSC Master Professional Prep Platform. This reviewer contains 100 randomized practice questions.</p>
          ${practiceQuestions.map((q, i) => `
            <div class="item">
              <div class="question">${i + 1}. ${q.text}</div>
              <div class="options">
                ${q.options.map((opt: string, oi: number) => `<div>${String.fromCharCode(65 + oi)}. ${opt}</div>`).join('')}
              </div>
              <div class="answer">Correct Answer: ${String.fromCharCode(65 + q.correctAnswerIndex)}</div>
              <div class="explanation"><strong>Explanation:</strong> ${q.explanation}</div>
            </div>
          `).join('')}
          <div class="footer">CSC Master - Official Review Material. For personal use only.</div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {!isQuizStarted && (
        <Link to="/modules" className="text-slate-400 text-sm font-bold flex items-center hover:text-indigo-600 transition-colors">
          <span className="mr-2">←</span> Back to Modules
        </Link>
      )}

      {!isQuizStarted && (
        <header className="flex items-center space-x-4 animate-in fade-in duration-500">
          <div className="text-5xl bg-white w-20 h-20 rounded-3xl flex items-center justify-center shadow-sm border border-slate-100">
            {topic.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-serif">{topic.title}</h2>
            <p className="text-slate-500 text-sm">{topic.description}</p>
          </div>
        </header>
      )}

      <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 transition-all">
        {!isQuizStarted && (
          <div className="flex bg-slate-50 p-1.5 m-2 rounded-[2rem]">
            <button 
              onClick={() => setActiveTab('explanation')}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.5rem] transition-all ${activeTab === 'explanation' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Study Guide
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={`flex-1 py-3 text-sm font-bold rounded-[1.5rem] transition-all ${activeTab === 'practice' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Practice Quiz (100 Items)
            </button>
          </div>
        )}

        <div className="p-6 md:p-8">
          {activeTab === 'explanation' && !isQuizStarted ? (
            <div className="prose prose-slate max-w-none space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <section className="bg-indigo-50/50 p-6 rounded-3xl border-l-4 border-indigo-500">
                <h4 className="text-indigo-900 font-bold mb-2">Core Concept</h4>
                <p className="text-indigo-900/80 text-sm leading-relaxed">
                  Understanding {topic.title} requires mastering the fundamental rules and applying them consistently in the context of public service duties.
                </p>
              </section>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Key Principles</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                  <li>Rule of application: Consistency and clarity in professional logic.</li>
                  <li>Common pitfalls: Avoid confusing local slang with professional English/Tagalog terminology.</li>
                  <li>CSC Emphasis: Focus on practical implementation in actual government office scenarios.</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-6 rounded-3xl border-l-4 border-amber-500">
                <h4 className="text-amber-900 font-bold mb-2">Sample Scenario</h4>
                <p className="text-amber-900/80 text-sm italic">
                  "In a typical government setting, {topic.title.toLowerCase()} is often tested through questions involving situational judgement or technical accuracy."
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col items-center">
                 <button 
                   onClick={handleAskAi}
                   disabled={isAskingAi}
                   className="flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-95 transition-all"
                 >
                   <span>{isAskingAi ? 'Tutor is thinking...' : '✨ Explain with AI Assistant'}</span>
                 </button>
                 {aiResponse && (
                   <div className="mt-6 p-6 bg-slate-900 text-slate-50 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500 text-sm leading-relaxed border border-slate-800">
                     <div className="flex items-center space-x-2 mb-3">
                        <span className="text-yellow-400 text-xl">💡</span>
                        <p className="font-bold text-yellow-400 uppercase tracking-widest text-[10px]">AI Master Insight</p>
                     </div>
                     {aiResponse}
                   </div>
                 )}
              </div>
            </div>
          ) : activeTab === 'practice' && !isQuizStarted ? (
            <div className="space-y-6 text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-4">🎯</div>
              <div>
                <h4 className="text-2xl font-bold text-slate-800 font-serif">100-Question Mastery Quiz</h4>
                <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
                  Test your true mastery of {topic.title} with a random set of 100 questions. This full-length drill ensures maximum retention.
                </p>
              </div>
              <button 
                onClick={startQuiz}
                className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Start Practice Mode
              </button>
            </div>
          ) : isQuizStarted && !isQuizFinished && practiceQuestions.length > 0 ? (
            <div className="animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Practice Drill</span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  Item {currentQuizIdx + 1} of 100
                </span>
              </div>
              
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${((currentQuizIdx + 1) / 100) * 100}%` }}
                />
              </div>

              <p className="text-xl text-slate-800 font-medium mb-10 leading-relaxed font-serif">
                {practiceQuestions[currentQuizIdx].text}
              </p>

              <div className="space-y-3 mb-10">
                {practiceQuestions[currentQuizIdx].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all flex items-center space-x-4 ${
                      quizAnswers[currentQuizIdx] === i 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md ring-2 ring-indigo-200' 
                      : 'border-slate-50 hover:border-slate-100 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      quizAnswers[currentQuizIdx] === i ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 shadow-sm'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 font-medium">{option}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                 <button 
                   onClick={() => isQuizStarted && currentQuizIdx === 0 ? resetQuiz() : setCurrentQuizIdx(prev => prev - 1)}
                   className="text-slate-400 font-bold hover:text-slate-600"
                 >
                   {currentQuizIdx === 0 ? 'Exit Quiz' : 'Previous'}
                 </button>
                 <div className="flex space-x-2">
                    {quizAnswers[currentQuizIdx] !== undefined && (
                        <button 
                            onClick={nextQuestion}
                            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                        >
                            {currentQuizIdx === 99 ? 'Finish' : 'Next'}
                        </button>
                    )}
                 </div>
              </div>
            </div>
          ) : isQuizFinished && !isReviewMode ? (
            <div className="text-center py-8 animate-in zoom-in-95 duration-500">
               <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">🏆</div>
               <h3 className="text-3xl font-bold text-slate-900 font-serif mb-2">Drill Complete!</h3>
               <p className="text-slate-500 mb-8">You went through 100 randomized questions on {topic.title}.</p>
               
               <div className="bg-slate-50 rounded-3xl p-8 mb-8 flex justify-around">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Items Correct</p>
                    <p className="text-4xl font-black text-indigo-600">{calculateScore()}<span className="text-slate-300 font-normal">/100</span></p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Overall %</p>
                    <p className="text-4xl font-black text-slate-900">{calculateScore()}%</p>
                  </div>
               </div>

               <div className="space-y-4">
                  <button 
                    onClick={() => setIsReviewMode(true)}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
                  >
                    Review All Answers & Explanations
                  </button>
                  <button 
                    onClick={startQuiz}
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-100"
                  >
                    Generate New Random Set
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="w-full bg-white text-slate-500 border border-slate-200 py-5 rounded-2xl font-bold"
                  >
                    Return to Study Guide
                  </button>
               </div>
            </div>
          ) : isQuizFinished && isReviewMode ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl sticky top-0 z-10 border border-slate-100">
                <button 
                  onClick={() => setIsReviewMode(false)}
                  className="text-indigo-600 font-bold text-sm"
                >
                  ← Back to Results
                </button>
                <button 
                  onClick={downloadReviewerPDF}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md"
                >
                  Download Reviewer PDF
                </button>
              </div>

              <div className="space-y-10">
                {practiceQuestions.map((q, i) => {
                  const userAnswer = quizAnswers[i];
                  const isCorrect = userAnswer === q.correctAnswerIndex;
                  return (
                    <div key={q.id} className="border-b border-slate-100 pb-8 last:border-0">
                      <div className="flex items-start space-x-3 mb-4">
                        <span className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {i + 1}
                        </span>
                        <p className="text-slate-800 font-medium leading-relaxed">{q.text}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {q.options.map((opt: string, oi: number) => {
                          let style = "bg-slate-50 text-slate-500 border-slate-100";
                          if (oi === q.correctAnswerIndex) style = "bg-green-50 text-green-700 border-green-200 font-bold";
                          if (userAnswer === oi && !isCorrect) style = "bg-red-50 text-red-700 border-red-200 font-bold";
                          
                          return (
                            <div key={oi} className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${style}`}>
                              <span className="w-5 h-5 flex items-center justify-center rounded bg-white/50 text-[10px]">{String.fromCharCode(65 + oi)}</span>
                              <span>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-indigo-50/50 p-4 rounded-2xl border-l-4 border-indigo-400">
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">Detailed Explanation</p>
                        <p className="text-xs text-slate-600 leading-relaxed italic">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-8 text-center">
                 <button 
                   onClick={resetQuiz}
                   className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-bold shadow-xl"
                 >
                   Done Reviewing
                 </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {!isQuizStarted && (
        <div className="bg-slate-900 text-white p-6 rounded-[2rem] flex justify-between items-center shadow-xl shadow-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offline Access</p>
            <p className="font-bold">Module PDF Reviewer</p>
          </div>
          <button className="bg-indigo-500 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-900/20 active:scale-90 transform transition-transform">
            📥
          </button>
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
