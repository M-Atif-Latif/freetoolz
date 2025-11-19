import { Wrench, Menu, X, ArrowLeft, Home as HomeIcon, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onNavigate: (path: string) => void;
  currentPath?: string;
}

export default function Header({ onNavigate, currentPath = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isToolPage = currentPath.startsWith('/tools/');

  const goBack = () => {
    onNavigate('/');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 dark:border-gray-800 safe-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
            <button onClick={() => onNavigate('/')} className="flex items-center space-x-1.5 sm:space-x-2 group transition-all duration-300 min-w-0">
              <div className="relative flex-shrink-0">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-600 dark:bg-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                Free<span className="text-blue-600 dark:text-blue-500">Toolz</span>
              </span>
            </button>
            {isToolPage && (
              <div className="hidden lg:flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <button
                  onClick={goBack}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="text-sm font-medium">Back</span>
                </button>
                <button
                  onClick={() => onNavigate('/')}
                  className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  <HomeIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Home</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <nav className="hidden md:flex items-center space-x-1">
              <button onClick={() => onNavigate('/')} className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium text-sm">Home</button>
              <button onClick={() => onNavigate('/blog')} className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium text-sm">Blog</button>
              <button onClick={() => onNavigate('/faq')} className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium text-sm">FAQ</button>
              <button onClick={() => onNavigate('/about')} className="px-3 lg:px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-200 font-medium text-sm">About</button>
              <button onClick={() => onNavigate('/contact')} className="px-3 lg:px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md">Contact</button>
            </nav>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group relative btn-touch"
              aria-label="Toggle dark mode"
            >
              <div className="relative">
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700 dark:text-gray-300 group-hover:rotate-90 transition-transform duration-300" />
                )}
              </div>
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 sm:p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 btn-touch"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t dark:border-gray-700 animate-in slide-in-from-top duration-200 safe-bottom">
            <nav className="flex flex-col space-y-1">
              {isToolPage && (
                <>
                  <button onClick={() => { goBack(); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Go Back</span>
                  </button>
                  <button onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg flex items-center space-x-2">
                    <HomeIcon className="h-4 w-4" />
                    <span>Home</span>
                  </button>
                  <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
                </>
              )}
              <button onClick={() => { onNavigate('/'); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg">Home</button>
              <button onClick={() => { onNavigate('/blog'); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg">Blog</button>
              <button onClick={() => { onNavigate('/faq'); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg">FAQ</button>
              <button onClick={() => { onNavigate('/about'); setMobileMenuOpen(false); }} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg">About</button>
              <button onClick={() => { onNavigate('/contact'); setMobileMenuOpen(false); }} className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-medium text-left px-4 py-3 rounded-lg shadow-sm">Contact</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
