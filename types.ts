
export type DifficultyLevel = 
  | 'Very Easy' 
  | 'Easy' 
  | 'Moderate' 
  | 'Above Average' 
  | 'Difficult' 
  | 'Very Difficult' 
  | 'Expert' 
  | 'Full CSC Simulation';

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  content: string;
  examples: Example[];
  practiceQuestions: Question[];
  pdfUrl?: string;
}

export interface Example {
  text: string;
  explanation: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topicId: string;
}

export interface MockExam {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  timeLimitSeconds: number; // 3h 10m = 11400
}

export interface ExamAttempt {
  id: string;
  examId: string;
  score: number;
  total: number;
  startTime: number;
  endTime: number;
  answers: Record<number, number>; // index: answerIndex
  flagged: number[]; // array of indices
  completed: boolean;
}

export interface UserProgress {
  completedLessons: string[];
  examAttempts: ExamAttempt[];
  streak: number;
  lastLoginDate: string;
  readinessScore: number; // 0 - 100
}

export interface User {
  id: string;
  name: string;
  role: 'learner' | 'admin';
  email: string;
}
