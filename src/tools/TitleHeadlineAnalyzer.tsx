import { useState } from 'react';
import { Trophy, AlertCircle } from 'lucide-react';

export default function TitleHeadlineAnalyzer() {
  const [title, setTitle] = useState('');

  const analyzeTitle = () => {
    if (!title.trim()) return null;

    const wordCount = title.trim().split(/\s+/).length;
    const charCount = title.length;
    const capitalWords = (title.match(/\b[A-Z][a-z]*\b/g) || []).length;
    
    // Emotional words
    const emotionalWords = ['amazing', 'incredible', 'shocking', 'unbelievable', 'secret', 'proven', 'guaranteed', 'free', 'new', 'exclusive', 'limited'];
    const hasEmotionalWords = emotionalWords.some(word => title.toLowerCase().includes(word));
    
    // Numbers
    const hasNumbers = /\d/.test(title);
    
    // Question
    const isQuestion = title.includes('?');
    
    // Calculate score
    let score = 50;
    if (wordCount >= 6 && wordCount <= 12) score += 15;
    if (charCount >= 40 && charCount <= 70) score += 10;
    if (hasEmotionalWords) score += 15;
    if (hasNumbers) score += 10;
    if (isQuestion) score += 5;
    if (capitalWords >= 2) score += 5;
    
    score = Math.min(100, score);

    return {
      score,
      wordCount,
      charCount,
      hasEmotionalWords,
      hasNumbers,
      isQuestion,
      capitalWords
    };
  };

  const analysis = analyzeTitle();

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Title & Headline Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Analyze headlines and titles for engagement, SEO, and clickability. Get instant feedback and improvement suggestions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Enter Your Title or Headline
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 10 Amazing Tips to Boost Your Productivity Today!"
            className="w-full px-4 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none text-lg"
          />
        </div>

        {analysis && (
          <>
            {/* Score Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
              <div className={`bg-gradient-to-r ${getScoreBg(analysis.score)} px-6 py-8 text-center`}>
                <div className="text-white mb-2">
                  <div className="text-6xl font-bold">{analysis.score}</div>
                  <div className="text-xl opacity-90">Overall Score</div>
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Word Count:</span>
                    <span className={`font-bold ${analysis.wordCount >= 6 && analysis.wordCount <= 12 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                      {analysis.wordCount} {analysis.wordCount >= 6 && analysis.wordCount <= 12 ? '✓' : '(aim for 6-12)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Character Count:</span>
                    <span className={`font-bold ${analysis.charCount >= 40 && analysis.charCount <= 70 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                      {analysis.charCount} {analysis.charCount >= 40 && analysis.charCount <= 70 ? '✓' : '(aim for 40-70)'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Capital Words:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{analysis.capitalWords}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Emotional Words:</span>
                    <span className={analysis.hasEmotionalWords ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400'}>
                      {analysis.hasEmotionalWords ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Contains Numbers:</span>
                    <span className={analysis.hasNumbers ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400'}>
                      {analysis.hasNumbers ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Is a Question:</span>
                    <span className={analysis.isQuestion ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400'}>
                      {analysis.isQuestion ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Suggestions</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    {analysis.wordCount < 6 && <li>• Add more words to make your title more descriptive (aim for 6-12 words)</li>}
                    {analysis.wordCount > 12 && <li>• Shorten your title for better readability (aim for 6-12 words)</li>}
                    {!analysis.hasEmotionalWords && <li>• Add emotional words like "amazing", "proven", "secret" to increase engagement</li>}
                    {!analysis.hasNumbers && <li>• Include numbers or statistics to make your title more compelling</li>}
                    {analysis.capitalWords < 2 && <li>• Use title case for better readability</li>}
                    {analysis.score >= 80 && <li>• Great job! Your title is highly optimized for engagement!</li>}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
