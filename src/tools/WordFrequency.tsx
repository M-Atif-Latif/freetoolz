import { useState } from 'react';
import { BarChart3, Copy, Download } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function WordFrequency() {
  const [text, setText] = useState('');
  const [minFrequency, setMinFrequency] = useState(2);
  const [results, setResults] = useState<{ word: string; count: number; percentage: number }[]>([]);

  const analyzeText = () => {
    if (!text.trim()) return;

    // Convert to lowercase and split into words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 0);

    // Count word frequency
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Convert to array and sort by frequency
    const sorted = Object.entries(frequency)
      .filter(([, count]) => count >= minFrequency)
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / words.length) * 100
      }))
      .sort((a, b) => b.count - a.count);

    setResults(sorted);
  };

  const copyResults = () => {
    const resultText = results
      .map(r => `${r.word}: ${r.count} (${r.percentage.toFixed(2)}%)`)
      .join('\n');
    navigator.clipboard.writeText(resultText);
  };

  const downloadResults = () => {
    const resultText = results
      .map(r => `${r.word},${r.count},${r.percentage.toFixed(2)}%`)
      .join('\n');
    const blob = new Blob([`Word,Frequency,Percentage\n${resultText}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word-frequency.csv';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <BarChart3 className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Word Frequency Counter</h1>
            <p className="text-gray-600 dark:text-gray-400">Analyze word usage and find common words</p>
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
              placeholder="Paste or type your text here..."
              className="w-full h-64 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Frequency: {minFrequency}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={minFrequency}
              onChange={(e) => setMinFrequency(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={analyzeText}
            disabled={!text.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Analyze Word Frequency
          </button>

          {results.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Results ({results.length} unique words)
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyResults}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                  <button
                    onClick={downloadResults}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    CSV
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900">
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold">#</th>
                      <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold">Word</th>
                      <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold">Count</th>
                      <th className="text-right py-2 px-4 text-gray-700 dark:text-gray-300 font-semibold">%</th>
                      <th className="py-2 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={result.word} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="py-2 px-4 text-gray-600 dark:text-gray-400">{index + 1}</td>
                        <td className="py-2 px-4 text-gray-900 dark:text-white font-medium">{result.word}</td>
                        <td className="py-2 px-4 text-right text-gray-900 dark:text-white font-semibold">{result.count}</td>
                        <td className="py-2 px-4 text-right text-gray-600 dark:text-gray-400">{result.percentage.toFixed(2)}%</td>
                        <td className="py-2 px-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(result.percentage * 5, 100)}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 How it works:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Paste or type any text to analyze word frequency</li>
            <li>Adjust minimum frequency to filter out rare words</li>
            <li>View results sorted by most frequent words</li>
            <li>Export results as CSV for further analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
