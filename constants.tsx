
import { Topic, MockExam, DifficultyLevel } from './types';

export const TOPICS: Topic[] = [
  { id: 'vocabulary', title: 'Vocabulary', description: 'Synonyms, antonyms, and word usage.', icon: '📖' },
  { id: 'grammar', title: 'Grammar and Correct Usage', description: 'Verb tenses, subject-verb agreement, and syntax.', icon: '✍️' },
  { id: 'org_ideas', title: 'Organization of Ideas', description: 'Paragraph organization and logical sequence.', icon: '🧩' },
  { id: 'analysis', title: 'Analysis / Synthesis', description: 'Reading comprehension and concluding from text.', icon: '🧠' },
  { id: 'analogy', title: 'Word Analogy', description: 'Relationship patterns between words.', icon: '🔗' },
  { id: 'data_interp', title: 'Data Interpretation', description: 'Reading charts, graphs, and tables.', icon: '📊' },
  { id: 'logic', title: 'Logic and Abstract Reasoning', description: 'Pattern recognition and deduction.', icon: '💡' },
  { id: 'numerical', title: 'Numerical Reasoning', description: 'Basic math, word problems, and sequences.', icon: '🔢' },
  { id: 'constitution', title: 'Philippine Constitution', description: 'Core principles and government structure.', icon: '⚖️' },
  { id: 'ra6713', title: 'Ethical Standards (RA 6713)', description: 'Conduct for public officials and employees.', icon: '🤝' },
  { id: 'environment', title: 'Environment Management', description: 'Protection and sustainability laws.', icon: '🌿' },
];

export const MOCK_EXAMS: MockExam[] = [
  { id: 'exam-1', title: 'Warm-up Assessment', difficulty: 'Very Easy' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-2', title: 'Foundation Builder', difficulty: 'Easy' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-3', title: 'Competency Check', difficulty: 'Moderate' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-4', title: 'Skilled Practitioner', difficulty: 'Above Average' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-5', title: 'Professional Challenge', difficulty: 'Difficult' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-6', title: 'Expert Simulation', difficulty: 'Very Difficult' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-7', title: 'Elite Mastery', difficulty: 'Expert' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
  { id: 'exam-8', title: 'Ultimate CSC Simulation', difficulty: 'Full CSC Simulation' as DifficultyLevel, totalQuestions: 170, timeLimitSeconds: 11400 },
];

export const EXAM_DURATION_SECONDS = 11400; // 3 hours 10 minutes
export const PASSING_PERCENTAGE = 80;
