import { useState } from 'react';
import { Split, Copy, Check } from 'lucide-react';

export default function SmartSentenceSplitter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Smart sentence splitting with support for abbreviations
  const splitIntoSentences = (input: string): string[] => {
    if (!input.trim()) return [];
    
    // Common abbreviations that shouldn't trigger sentence breaks
    const abbreviations = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Sr.', 'Jr.', 'etc.', 'vs.', 'e.g.', 'i.e.'];
    
    let processedText = input;
    
    // Temporarily replace abbreviations
    abbreviations.forEach((abbr, index) => {
      const placeholder = `__ABBR${index}__`;
      processedText = processedText.split(abbr).join(placeholder);
    });
    
    // Split on sentence endings
    const sentences = processedText
      .split(/([.!?]+[\s\n]+)/)
      .filter(s => s.trim())
      .reduce((acc: string[], curr, index, arr) => {
        if (index % 2 === 0) {
          const next = arr[index + 1] || '';
          acc.push((curr + next).trim());
        }
        return acc;
      }, []);
    
    // Restore abbreviations
    return sentences.map(sentence => {
      let restored = sentence;
      abbreviations.forEach((abbr, index) => {
        const placeholder = `__ABBR${index}__`;
        restored = restored.split(placeholder).join(abbr);
      });
      return restored;
    });
  };

  const sentences = splitIntoSentences(text);

  const copyAllSentences = () => {
    const formatted = sentences.map((s, i) => `${i + 1}. ${s}`).join('\n\n');
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Split className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Smart Sentence Splitter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Intelligently split text into individual sentences. Handles abbreviations like Dr., Mr., etc. correctly.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Input Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here. For example: Dr. Smith went to the store. He bought apples. Then he went home!"
            className="w-full h-48 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none text-base leading-relaxed"
          />
        </div>

        {/* Results */}
        {sentences.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Sentences Found</h2>
                <p className="text-sm text-blue-100">Total: {sentences.length} sentences</p>
              </div>
              <button
                onClick={copyAllSentences}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm font-medium"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy All'}</span>
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {sentences.map((sentence, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="flex-1 text-gray-900 dark:text-white leading-relaxed">
                      {sentence}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Features</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• Handles common abbreviations (Dr., Mr., Mrs., etc.)</li>
            <li>• Recognizes sentence endings: . ! ?</li>
            <li>• Preserves original formatting</li>
            <li>• Perfect for analyzing essays, articles, and documents</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
