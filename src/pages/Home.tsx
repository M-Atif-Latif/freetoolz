import { useState, useMemo, startTransition, useEffect, useRef, memo, lazy, Suspense } from 'react';
import { tools, categories } from '../data/tools';
import type { Tool } from '../types';
import DynamicIcon from '../components/DynamicIcon';

interface HomeProps {
  onNavigate: (path: string) => void;
}

const INITIAL_RENDER_COUNT = 12;
const LOAD_BATCH_SIZE = 24;
const OBSERVER_MARGIN = '480px';

const SearchIcon = lazy(() => import('lucide-react').then((mod) => ({ default: mod.Search })));
const ArrowRightIcon = lazy(() => import('lucide-react').then((mod) => ({ default: mod.ArrowRight })));

const IconFallback = ({ className }: { className?: string }) => (
  <div className={className} aria-hidden="true" role="presentation" />
);

export default function Home({ onNavigate }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Memoize filtered tools to prevent unnecessary recalculations
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredTools = useMemo(() => {
    // Memoize filtering to keep re-renders fast while typing
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const cappedVisibleCount = Math.min(visibleCount, filteredTools.length);
  const visibleTools = useMemo(() => filteredTools.slice(0, cappedVisibleCount), [filteredTools, cappedVisibleCount]);
  const hasMoreResults = cappedVisibleCount < filteredTools.length;

  useEffect(() => {
    setVisibleCount(INITIAL_RENDER_COUNT);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (!hasMoreResults) {
      return;
    }

    const target = loadMoreRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        setVisibleCount((prev) => Math.min(prev + LOAD_BATCH_SIZE, filteredTools.length));
      }
    }, { rootMargin: OBSERVER_MARGIN });

    observer.observe(target);
    return () => observer.disconnect();
  }, [filteredTools.length, hasMoreResults]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_BATCH_SIZE, filteredTools.length));
  };

  // Handle search with transition for better UX
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    startTransition(() => {
      setSearchQuery(value);
    });
  };

  // Handle category change with transition
  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-responsive py-8 sm:py-12 md:py-16">
        {/* Hero Section - Optimized for LCP */}
        <div className="hero-section text-center mb-12 sm:mb-16 md:mb-20 animate-in fade-in duration-700">
          <div className="inline-block mb-4 sm:mb-6 relative">
            <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm border border-blue-200 dark:border-blue-800">
              ✨ 100% Free • No Registration • Privacy First
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              120+ Free Online Tools
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-6">
            Professional-grade utilities for text processing, PDF manipulation, image editing, calculations, 
            conversions, code formatting, data analysis, security testing, and more. All tools work directly in your browser—no installation, no registration, 
            completely free.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-gray-700 dark:text-gray-200 px-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 min-w-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold truncate text-gray-900 dark:text-gray-100">Always Free</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 min-w-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold truncate text-gray-900 dark:text-gray-100">No Registration</span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 min-w-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="font-semibold truncate text-gray-900 dark:text-gray-100">Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="relative group">
            <Suspense fallback={<IconFallback className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6" />}>
              <SearchIcon className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5 sm:h-6 sm:w-6 transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400" />
            </Suspense>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none text-base sm:text-lg shadow-lg hover:shadow-xl placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 md:mb-20 px-4 overflow-x-auto scrollbar-hide pb-2" style={{ contentVisibility: 'auto', containIntrinsicSize: '200px' }}>
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 sm:px-6 md:px-7 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-200 dark:shadow-blue-900/50' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
            }`}>
            All Tools
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 sm:px-6 md:px-7 py-2 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap ${
                selectedCategory === cat.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-200 dark:shadow-blue-900/50' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700'
              }`}>
              {cat.name} <span className="hidden sm:inline">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <h2 className="sr-only">Available Tools</h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-4"
          style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}
        >
          {visibleTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>

        {hasMoreResults && (
          <div className="flex flex-col items-center mt-6 sm:mt-8" ref={loadMoreRef}>
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-6 py-3 text-sm sm:text-base font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full bg-white/80 dark:bg-gray-900/60 shadow-sm hover:shadow-md transition-all"
            >
              Load more tools
            </button>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              More tools load automatically as you reach the bottom.
            </p>
          </div>
        )}

        {/* No Results Message */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="inline-block p-4 sm:p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl mb-4 sm:mb-6 shadow-lg">
              <Suspense fallback={<IconFallback className="h-12 w-12 sm:h-16 sm:w-16" />}>
                <SearchIcon className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 dark:text-gray-500" />
              </Suspense>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-xl font-semibold mb-2">No tools found matching your search.</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your search terms or browse all categories.</p>
          </div>
        )}
      </div>
    </main>
  );
}

interface ToolCardProps {
  tool: Tool;
  onNavigate: (path: string) => void;
}

const ToolCard = memo(function ToolCard({ tool, onNavigate }: ToolCardProps) {
  return (
    <button
      onClick={() => onNavigate(tool.path)}
      className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-7 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 group text-left transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 md:p-3.5 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg sm:rounded-xl text-blue-600 dark:text-blue-400 group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-500 dark:group-hover:to-purple-500 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
            <DynamicIcon name={tool.icon} className="h-6 w-6" aria-hidden="true" />
          </div>
          <Suspense fallback={<IconFallback className="h-4 w-4 sm:h-5 sm:w-5" />}>
            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
          </Suspense>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {tool.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">{tool.description}</p>
      </div>
    </button>
  );
});
