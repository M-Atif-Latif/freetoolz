import { useState } from 'react';
import { Shuffle, Copy, Check } from 'lucide-react';

export default function TextRandomizer() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'words' | 'characters' | 'lines'>('words');
  const [copied, setCopied] = useState(false);

  const randomizeText = (): string => {
    if (!text.trim()) return '';

    const shuffle = <T,>(array: T[]): T[] => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    switch (mode) {
      case 'words': {
        const words = text.trim().split(/\s+/);
        return shuffle(words).join(' ');
      }
      case 'characters': {
        const chars = text.split('');
        return shuffle(chars).join('');
      }
      case 'lines': {
        const lines = text.split('\n').filter(line => line.trim());
        return shuffle(lines).join('\n');
      }
      default:
        return text;
    }
  };

  const randomized = randomizeText();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Shuffle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Text Randomizer / Shuffler
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Randomly shuffle words, characters, or lines in your text. Perfect for creating word games, generating passwords, or mixing content.
          </p>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setMode('words')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'words'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Shuffle Words
            </button>
            <button
              onClick={() => setMode('characters')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'characters'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Shuffle Characters
            </button>
            <button
              onClick={() => setMode('lines')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'lines'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Shuffle Lines
            </button>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Original Text</h2>
            </div>
            <div className="p-6">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  mode === 'words'
                    ? 'The quick brown fox jumps over the lazy dog'
                    : mode === 'characters'
                    ? 'Hello World'
                    : 'Line 1\nLine 2\nLine 3'
                }
                className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none text-lg leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Randomized Text</h2>
              <button
                onClick={copyToClipboard}
                disabled={!randomized}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-6">
              <div className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto text-lg leading-relaxed whitespace-pre-wrap font-mono">
                {randomized || (
                  <span className="text-gray-400 dark:text-gray-500">
                    Shuffled text will appear here...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Use Cases</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <strong>Words:</strong> Create anagrams, word puzzles, or mix up sentences</li>
            <li>• <strong>Characters:</strong> Generate random strings or passwords</li>
            <li>• <strong>Lines:</strong> Randomize lists, quiz questions, or poetry verses</li>
            <li>• Perfect for educational games, creative writing, and data anonymization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
