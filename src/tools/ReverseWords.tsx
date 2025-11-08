import { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

export default function ReverseWords() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const reverseWords = (input: string): string => {
    if (!input.trim()) return '';
    
    // Split by spaces, reverse the array, and join back
    return input.split(' ').reverse().join(' ');
  };

  const reversedText = reverseWords(text);

  const copyToClipboard = () => {
    if (reversedText) {
      navigator.clipboard.writeText(reversedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <ArrowLeftRight className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Reverse Words
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Reverse the order of words in your sentences while keeping the words intact.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Original Text</h2>
            </div>
            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none text-lg leading-relaxed"
              />
              <div className="mt-4 flex gap-3">
                <button
                  onClick={clearText}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Reversed Text</h2>
              <button
                onClick={copyToClipboard}
                disabled={!reversedText}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-6">
              <div className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto text-lg leading-relaxed">
                {reversedText || (
                  <span className="text-gray-400 dark:text-gray-500">
                    Reversed text will appear here...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Examples
          </h3>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Original:</p>
                <p className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  Hello World Welcome Home
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Reversed:</p>
                <p className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  Home Welcome World Hello
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Original:</p>
                <p className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  I love coding in JavaScript
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Reversed:</p>
                <p className="text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 p-3 rounded-lg">
                  JavaScript in coding love I
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Use Cases
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Create word puzzles and games</li>
            <li>• Test language processing algorithms</li>
            <li>• Generate creative text variations</li>
            <li>• Educational purposes for teaching word order</li>
            <li>• Text manipulation for fun or artistic purposes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
