import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function SyllableCounter() {
  const [text, setText] = useState('');

  const countSyllables = (word: string): number => {
    word = word.toLowerCase().trim();
    if (word.length <= 3) return 1;
    
    // Remove common endings
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    // Count vowel groups
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const analyzeText = () => {
    if (!text.trim()) return null;

    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    const wordSyllables: { word: string; syllables: number }[] = [];
    let totalSyllables = 0;

    words.forEach(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      if (cleanWord) {
        const count = countSyllables(cleanWord);
        wordSyllables.push({ word, syllables: count });
        totalSyllables += count;
      }
    });

    const avgSyllables = words.length > 0 ? (totalSyllables / words.length).toFixed(2) : '0';

    return {
      totalWords: words.length,
      totalSyllables,
      avgSyllables,
      wordSyllables
    };
  };

  const result = analyzeText();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
            <Volume2 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Syllable Counter</h1>
            <p className="text-gray-600 dark:text-gray-400">Count syllables in text and words</p>
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
              placeholder="Enter text to count syllables..."
              rows={8}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {result && result.totalWords > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-6 border-2 border-pink-200 dark:border-pink-800">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Syllables</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    {result.totalSyllables}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Words</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.totalWords}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg per Word</div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.avgSyllables}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 sticky top-0 bg-gray-50 dark:bg-gray-900 pb-2">
                  Word-by-Word Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.wordSyllables.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-gray-900 dark:text-white font-medium">{item.word}</span>
                      <span className="text-pink-600 dark:text-pink-400 font-bold">
                        {item.syllables} {item.syllables === 1 ? 'syllable' : 'syllables'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 About Syllables:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>A syllable is a unit of pronunciation with one vowel sound</li>
            <li>Words can have one or more syllables</li>
            <li>Example: "cat" has 1 syllable, "but-ter" has 2, "com-pu-ter" has 3</li>
            <li>Syllable count is important for poetry, song writing, and readability</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
