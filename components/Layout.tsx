
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Home', icon: '🏠' },
    { path: '/modules', label: 'Study', icon: '📚' },
    { path: '/ai-coach', label: 'AI Coach', icon: '✨' },
    { path: '/mock-exams', label: 'Exams', icon: '📝' },
    { path: '/profile', label: 'Me', icon: '👤' },
  ];

  const hideNavOnPages = ['/exam-interface', '/welcome', '/login', '/signup'];
  const shouldHideNav = hideNavOnPages.some(page => location.pathname.startsWith(page));

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pl-64 flex flex-col">
      {!shouldHideNav && (
        <>
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex-col p-6 shadow-xl z-50">
            <div className="mb-10">
              <h1 className="text-2xl font-bold text-yellow-400">CSC MASTER</h1>
              <p className="text-slate-400 text-sm">Professional Level</p>
            </div>
            <nav className="space-y-4">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname.startsWith(item.path) ? 'bg-slate-800 text-yellow-400' : 'hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-10 space-y-4">
                <Link to="/calendar" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400">
                  <span className="text-xl">📅</span>
                  <span className="font-medium">Calendar</span>
                </Link>
                <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 text-slate-400 border-t border-slate-800 pt-10">
                  <span className="text-xl">⚙️</span>
                  <span className="font-medium">Admin Panel</span>
                </Link>
              </div>
            </nav>
          </aside>

          {/* Mobile Tab Bar */}
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 z-50">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 transition-colors ${
                  location.pathname.startsWith(item.path) ? 'text-indigo-600' : 'text-slate-400'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Top Bar for Mobile */}
          <header className="md:hidden sticky top-0 bg-white p-4 border-b border-slate-200 flex justify-between items-center z-40">
            <h1 className="text-lg font-bold text-slate-800">CSC Master</h1>
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">JD</div>
            </div>
          </header>
        </>
      )}

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
