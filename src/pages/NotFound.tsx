import { Home, Search, ArrowLeft, Lightbulb } from 'lucide-react';
import { useSEO, notFoundSEO } from '../utils/useSEO';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

export default function NotFound({ onNavigate }: NotFoundProps) {
  useSEO(notFoundSEO);
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-[150px] sm:text-[200px] font-extrabold text-gray-100 dark:text-gray-800 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-br from-secondary-500 to-purple-600 rounded-full p-6 shadow-2xl animate-bounce">
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
          Don't worry, explore our 140+ free tools below and find exactly what you need.
        </p>

        {/* Quick Start Help */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Pro Tip</h2>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Use the search bar or category filters to find the right tool. You can also check recent or trending tools to see what others are using.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

        {/* Suggested Categories */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-semibold">
            Browse by Category
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'Text Tools', path: '/text-tools' },
              { name: 'Image Tools', path: '/image-tools' },
              { name: 'PDF Tools', path: '/pdf-tools' },
              { name: 'Calculators', path: '/calculators' },
              { name: 'Converters', path: '/converters' },
              { name: 'Developers', path: '/developers' },
              { name: 'Security', path: '/security' },
              { name: 'All Tools', path: '/sitemap' },
            ].map((cat) => (
              <button
                key={cat.path}
                onClick={() => onNavigate(cat.path)}
                className="px-3 py-2 text-sm bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 hover:from-primary-200 hover:to-secondary-200 dark:hover:from-primary-900/50 dark:hover:to-secondary-900/50 text-primary-700 dark:text-primary-300 hover:text-primary-900 dark:hover:text-primary-200 rounded-lg transition-all font-medium border border-primary-200 dark:border-primary-700"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Tools */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-semibold">
            Popular tools to get started
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'Word Counter', path: '/word-counter' },
              { name: 'Password Generator', path: '/password-generator' },
              { name: 'QR Code Generator', path: '/qr-code-generator' },
              { name: 'JSON Formatter', path: '/json-formatter' },
              { name: 'Base64 Encoder', path: '/base64-converter' },
              { name: 'Color Picker', path: '/color-picker' },
              { name: 'Case Converter', path: '/case-converter' },
              { name: 'URL Encoder', path: '/url-encoder' },
            ].map((tool) => (
              <button
                key={tool.path}
                onClick={() => onNavigate(tool.path)}
                className="px-3 py-2 text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg transition-all font-medium border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600"
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


