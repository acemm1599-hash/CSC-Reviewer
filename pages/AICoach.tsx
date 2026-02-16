
import React, { useState, useRef, useEffect } from 'react';
import { getAiCoachResponse } from '../services/geminiService';
import { TOPICS } from '../constants';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Mabuhay! I am your CSC Master AI Coach. I've analyzed your progress. Based on your recent activity, you're doing great in Vocabulary, but we should sharpen your Numerical Reasoning. How can I help you prepare today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulated progress context - in a real app, this would come from global state/localStorage
  const progressContext = {
    readinessScore: 65,
    streak: 4,
    completedLessons: ['vocabulary-1', 'grammar-1', 'ra6713-1'],
    examAverage: 72,
    weakTopics: ['Numerical Reasoning', 'Logic and Abstract Reasoning'],
    strongTopics: ['Vocabulary', 'Philippine Constitution']
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiRes = await getAiCoachResponse(userMsg, progressContext);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiRes }]);
    setIsLoading(false);
  };

  const predefinedPrompts = [
    "What should I review today?",
    "Which topics am I weakest in?",
    "How can I improve my Numerical Reasoning score?",
    "Create a 7-day study plan for me",
    "Tips for time management during the exam"
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-4 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-serif">AI Study Coach</h2>
          <p className="text-slate-500 text-xs">Personalized exam strategy & guidance</p>
        </div>
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-100 animate-pulse">
          ✨
        </div>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-white rounded-[2rem] border border-slate-100 shadow-sm p-4 space-y-4"
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none shadow-md' 
                : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100 shadow-sm'
            }`}>
              {m.text.split('\n').map((line, li) => (
                <p key={li} className={li > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 p-4 rounded-2xl rounded-bl-none border border-slate-100 flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar">
        {predefinedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="flex-shrink-0 bg-white border border-slate-200 px-4 py-2 rounded-full text-[10px] font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 shadow-sm"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask your coach anything..."
          className="w-full bg-white border border-slate-200 p-5 pr-16 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg transition-all"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={!input.trim() || isLoading}
          className="absolute right-3 top-3 w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-indigo-100 disabled:opacity-50 transition-all active:scale-90"
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default AICoach;
