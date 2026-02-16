
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import MockExams from './pages/MockExams';
import ExamInstructions from './pages/ExamInstructions';
import ExamInterface from './pages/ExamInterface';
import ExamResults from './pages/ExamResults';
import Calendar from './pages/Calendar';
import Downloads from './pages/Downloads';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AICoach from './pages/AICoach';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Welcome />} />
          <Route path="/login" element={<Login onLogin={(u) => { setUser(u); setIsAuthenticated(true); }} />} />
          <Route path="/signup" element={<Signup onSignup={(u) => { setUser(u); setIsAuthenticated(true); }} />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/modules" element={isAuthenticated ? <Modules /> : <Navigate to="/login" />} />
          <Route path="/modules/:topicId" element={isAuthenticated ? <ModuleDetail /> : <Navigate to="/login" />} />
          <Route path="/ai-coach" element={isAuthenticated ? <AICoach /> : <Navigate to="/login" />} />
          <Route path="/mock-exams" element={isAuthenticated ? <MockExams /> : <Navigate to="/login" />} />
          <Route path="/exam-instructions/:examId" element={isAuthenticated ? <ExamInstructions /> : <Navigate to="/login" />} />
          <Route path="/exam-interface/:examId" element={isAuthenticated ? <ExamInterface /> : <Navigate to="/login" />} />
          <Route path="/exam-results/:attemptId" element={isAuthenticated ? <ExamResults /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
          <Route path="/downloads" element={isAuthenticated ? <Downloads /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile user={user} onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
