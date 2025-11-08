import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

export default function RegexBulkReplace() {
  const [text, setText] = useState('');
  const [pattern, setPattern] = useState('');
  const [replacement, setReplacement] = useState('');
  const [flags, setFlags] = useState('g');
  const [result, setResult] = useState('');
  const [matches, setMatches] = useState(0);
  const [error, setError] = useState('');

  const performReplace = () => {
    setError('');
    
    try {
      const regex = new RegExp(pattern, flags);
      const matchCount = (text.match(regex) || []).length;
      const replaced = text.replace(regex, replacement);
      
      setResult(replaced);
      setMatches(matchCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setResult('');
      setMatches(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Regex Bulk Replace
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find and replace text using regular expressions (RegEx)
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Regex Pattern & Replacement</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Regex Pattern
                </label>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="e.g. \d+|\w+@\w+\.\w+"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Replacement Text
                </label>
                <input
                  type="text"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  placeholder="e.g. [REDACTED] or $1"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Flags
              </label>
              <div className="flex space-x-4">
                {[
                  { flag: 'g', label: 'Global (all matches)' },
                  { flag: 'i', label: 'Case insensitive' },
                  { flag: 'm', label: 'Multiline' },
                ].map(({ flag, label }) => (
                  <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flags.includes(flag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFlags(flags + flag);
                        } else {
                          setFlags(flags.replace(flag, ''));
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-900 dark:text-red-400">{error}</div>
              </div>
            )}

            <button
              onClick={performReplace}
              disabled={!pattern || !text}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Replace All Matches
            </button>

            {matches > 0 && (
              <div className="mt-4 text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <span className="text-green-900 dark:text-green-400 font-semibold">
                  {matches} match{matches !== 1 ? 'es' : ''} found and replaced
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Input & Output */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Original Text</h2>
            </div>
            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to find and replace..."
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Result</h2>
            </div>
            <div className="p-6">
              <textarea
                value={result}
                readOnly
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
              {result && (
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Copy Result
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Common Regex Patterns</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">\d+</div>
              <div className="text-gray-600 dark:text-gray-400">Match numbers</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">\w+@\w+\.\w+</div>
              <div className="text-gray-600 dark:text-gray-400">Match emails</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">https?://\S+</div>
              <div className="text-gray-600 dark:text-gray-400">Match URLs</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">\s+</div>
              <div className="text-gray-600 dark:text-gray-400">Match whitespace</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">[A-Z]\w+</div>
              <div className="text-gray-600 dark:text-gray-400">Match capitalized words</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="font-bold text-gray-900 dark:text-white mb-1">(\w+)\s+\1</div>
              <div className="text-gray-600 dark:text-gray-400">Match repeated words</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
