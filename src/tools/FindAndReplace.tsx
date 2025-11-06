import { useState } from 'react';
import { Search, Replace } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function FindAndReplace() {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matchCount, setMatchCount] = useState(0);

  const highlightMatches = () => {
    if (!findText || !text) {
      setMatchCount(0);
      return text;
    }

    try {
      let pattern: RegExp;
      if (useRegex) {
        pattern = new RegExp(findText, caseSensitive ? 'g' : 'gi');
      } else {
        const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = new RegExp(escapedText, caseSensitive ? 'g' : 'gi');
      }

      const matches = text.match(pattern);
      setMatchCount(matches ? matches.length : 0);

      return text;
    } catch (error) {
      setMatchCount(0);
      return text;
    }
  };

  const replaceAll = () => {
    if (!findText || !text) return;

    try {
      let pattern: RegExp;
      if (useRegex) {
        pattern = new RegExp(findText, caseSensitive ? 'g' : 'gi');
      } else {
        const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = new RegExp(escapedText, caseSensitive ? 'g' : 'gi');
      }

      const newText = text.replace(pattern, replaceText);
      setText(newText);
      
      // Update match count
      const matches = newText.match(pattern);
      setMatchCount(matches ? matches.length : 0);
    } catch (error) {
      alert('Invalid regular expression');
    }
  };

  const replaceFirst = () => {
    if (!findText || !text) return;

    try {
      let pattern: RegExp;
      if (useRegex) {
        pattern = new RegExp(findText, caseSensitive ? '' : 'i');
      } else {
        const escapedText = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = new RegExp(escapedText, caseSensitive ? '' : 'i');
      }

      const newText = text.replace(pattern, replaceText);
      setText(newText);
    } catch (error) {
      alert('Invalid regular expression');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  highlightMatches();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Search className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find and Replace</h1>
            <p className="text-gray-600 dark:text-gray-400">Search and replace text with regex support</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Text Content
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste your text here..."
              rows={10}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Find
              </label>
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Text to find..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Replace With
              </label>
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replacement text..."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Case Sensitive</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Use Regular Expression</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={replaceFirst}
              disabled={!findText || !text}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Replace className="h-5 w-5" />
              Replace First
            </button>

            <button
              onClick={replaceAll}
              disabled={!findText || !text}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Replace className="h-5 w-5" />
              Replace All
            </button>
          </div>

          {findText && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Matches Found</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {matchCount} occurrence{matchCount !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  {matchCount}
                </div>
              </div>
            </div>
          )}

          <button
            onClick={copyToClipboard}
            disabled={!text}
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Copy Result to Clipboard
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Regex Examples:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 font-mono">
            <li>• <code>\d+</code> - Match any number</li>
            <li>• <code>\w+</code> - Match any word</li>
            <li>• <code>^start</code> - Match line starting with "start"</li>
            <li>• <code>end$</code> - Match line ending with "end"</li>
            <li>• <code>[a-z]+</code> - Match lowercase letters</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
