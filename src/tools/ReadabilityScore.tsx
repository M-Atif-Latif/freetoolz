import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function ReadabilityScore() {
  const [text, setText] = useState('');

  const countSyllables = (word: string): number => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return syllables ? syllables.length : 1;
  };

  const calculateReadability = () => {
    if (!text.trim()) return null;

    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;

    // Count words
    const words = text.split(/\s+/).filter(w => w.trim().length > 0);
    const wordCount = words.length;

    // Count syllables
    let syllableCount = 0;
    words.forEach(word => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '');
      if (cleanWord) syllableCount += countSyllables(cleanWord);
    });

    // Flesch Reading Ease Score (0-100, higher is easier)
    const fleschScore = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllableCount / wordCount);
    const fleschScoreClamped = Math.max(0, Math.min(100, fleschScore));

    // Flesch-Kincaid Grade Level
    const gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllableCount / wordCount) - 15.59;
    const gradeLevelClamped = Math.max(0, gradeLevel);

    // Average words per sentence
    const avgWordsPerSentence = wordCount / sentenceCount;

    // Average syllables per word
    const avgSyllablesPerWord = syllableCount / wordCount;

    // Determine reading level
    let readingLevel = '';
    let readingColor = '';
    
    if (fleschScoreClamped >= 90) {
      readingLevel = 'Very Easy';
      readingColor = 'green';
    } else if (fleschScoreClamped >= 80) {
      readingLevel = 'Easy';
      readingColor = 'lime';
    } else if (fleschScoreClamped >= 70) {
      readingLevel = 'Fairly Easy';
      readingColor = 'yellow';
    } else if (fleschScoreClamped >= 60) {
      readingLevel = 'Standard';
      readingColor = 'orange';
    } else if (fleschScoreClamped >= 50) {
      readingLevel = 'Fairly Difficult';
      readingColor = 'red';
    } else if (fleschScoreClamped >= 30) {
      readingLevel = 'Difficult';
      readingColor = 'red';
    } else {
      readingLevel = 'Very Difficult';
      readingColor = 'red';
    }

    return {
      fleschScore: fleschScoreClamped.toFixed(1),
      gradeLevel: gradeLevelClamped.toFixed(1),
      readingLevel,
      readingColor,
      sentenceCount,
      wordCount,
      syllableCount,
      avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
      avgSyllablesPerWord: avgSyllablesPerWord.toFixed(2)
    };
  };

  const result = calculateReadability();

  const getColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      green: 'from-green-600 to-emerald-600',
      lime: 'from-lime-600 to-green-600',
      yellow: 'from-yellow-600 to-orange-600',
      orange: 'from-orange-600 to-red-600',
      red: 'from-red-600 to-pink-600'
    };
    return colors[color] || 'from-gray-600 to-gray-600';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Readability Score</h1>
            <p className="text-gray-600 dark:text-gray-400">Analyze text readability with Flesch scores</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Enter Text to Analyze
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here..."
              rows={10}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          {result && (
            <div className="space-y-4">
              <div className={`bg-gradient-to-br ${getColorClass(result.readingColor).replace('from-', 'from-').replace('to-', 'to-').replace(/600/g, '50')} dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800`}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reading Level</h2>
                <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getColorClass(result.readingColor)}`}>
                  {result.readingLevel}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Flesch Reading Ease</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.fleschScore}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Higher is easier (0-100)</div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Flesch-Kincaid Grade</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {result.gradeLevel}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">U.S. grade level required</div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Text Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Sentences</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.sentenceCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Words</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.wordCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Syllables</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.syllableCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Avg Words/Sentence</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.avgWordsPerSentence}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Avg Syllables/Word</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.avgSyllablesPerWord}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Reading Ease Scale:</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <div>• <strong>90-100:</strong> Very Easy (5th grade)</div>
            <div>• <strong>80-90:</strong> Easy (6th grade)</div>
            <div>• <strong>70-80:</strong> Fairly Easy (7th grade)</div>
            <div>• <strong>60-70:</strong> Standard (8th-9th grade)</div>
            <div>• <strong>50-60:</strong> Fairly Difficult (10th-12th grade)</div>
            <div>• <strong>30-50:</strong> Difficult (College)</div>
            <div>• <strong>0-30:</strong> Very Difficult (College graduate)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
