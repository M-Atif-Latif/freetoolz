import { Home, Search, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-extrabold text-gray-100 dark:text-gray-800 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-6 shadow-2xl animate-bounce">
              <Search className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Don't worry, you can explore our 120+ free tools from the homepage.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Popular tools suggestion */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Or try one of our popular tools:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Word Counter', path: '/tools/word-counter' },
              { name: 'Password Generator', path: '/tools/password-generator' },
              { name: 'QR Code Generator', path: '/tools/qr-code-generator' },
              { name: 'JSON Formatter', path: '/tools/json-formatter' },
            ].map((tool) => (
              <button
                key={tool.path}
                onClick={() => onNavigate(tool.path)}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors"
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
