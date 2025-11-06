import { Home, ArrowLeft, ArrowRight, List } from 'lucide-react';

interface ToolNavigationProps {
  onNavigate?: (path: string) => void;
}

export default function ToolNavigation({ onNavigate }: ToolNavigationProps) {
  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.location.pathname = path;
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleForward = () => {
    window.history.forward();
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Browser Navigation */}
      <div className="flex gap-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md group"
          title="Go Back"
        >
          <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            Back
          </span>
        </button>

        <button
          onClick={handleForward}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md group"
          title="Go Forward"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            Forward
          </span>
          <ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
      </div>

      {/* Quick Links */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          title="Go to Home"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm">Home</span>
        </button>

        <button
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md group"
          title="Browse All Tools"
        >
          <List className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            All Tools
          </span>
        </button>
      </div>
    </div>
  );
}
