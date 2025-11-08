import { useState } from 'react';
import { AlignLeft } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function LetterCounter() {
  const [text, setText] = useState('');

  const analyzeLetters = () => {
    if (!text) return null;

    const letterFrequency: { [key: string]: number } = {};
    const letters = text.toLowerCase().match(/[a-z]/g) || [];

    letters.forEach(letter => {
      letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
    });

    const sortedLetters = Object.entries(letterFrequency)
      .sort((a, b) => b[1] - a[1]);

    const totalLetters = letters.length;
    const uniqueLetters = Object.keys(letterFrequency).length;

    return {
      totalLetters,
      uniqueLetters,
      letterFrequency: sortedLetters,
      vowels: (text.match(/[aeiouAEIOU]/g) || []).length,
      consonants: (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length
    };
  };

  const result = analyzeLetters();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl">
            <AlignLeft className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Letter Counter</h1>
            <p className="text-gray-600 dark:text-gray-400">Count and analyze letters in your text</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to analyze letters..."
              rows={10}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {result && result.totalLetters > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Letters</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                    {result.totalLetters}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unique Letters</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.uniqueLetters}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vowels</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.vowels}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Consonants</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.consonants}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sticky top-0 bg-gray-50 dark:bg-gray-900 pb-2">
                  Letter Frequency
                </h3>
                <div className="space-y-2">
                  {result.letterFrequency.map(([letter, count]) => (
                    <div key={letter} className="flex items-center gap-3">
                      <div className="w-8 text-center font-bold text-gray-900 dark:text-white uppercase">
                        {letter}
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                        <div
                          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-6 rounded-full flex items-center justify-end px-2"
                          style={{ width: `${(count / result.totalLetters) * 100}%` }}
                        >
                          <span className="text-xs text-white font-semibold">{count}</span>
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm text-gray-600 dark:text-gray-400">
                        {((count / result.totalLetters) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Use Cases:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Analyze text patterns and letter distribution</li>
            <li>Cryptography and code-breaking exercises</li>
            <li>Language learning and linguistic analysis</li>
            <li>Text game development (like word puzzles)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
