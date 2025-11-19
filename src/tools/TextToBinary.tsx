import { useState } from 'react';
import { Binary } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

export default function TextToBinary() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const textToBinary = (text: string): string => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (binary: string): string => {
    try {
      return binary
        .split(' ')
        .map(bin => String.fromCharCode(parseInt(bin, 2)))
        .join('');
    } catch (error) {
      return 'Invalid binary input';
    }
  };

  const output = mode === 'encode' ? textToBinary(input) : binaryToText(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
            <Binary className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Text to Binary Converter</h1>
            <p className="text-gray-600 dark:text-gray-400">Convert text to binary and vice versa</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setMode('encode')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Text to Binary
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Binary to Text
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Input Text' : 'Input Binary'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to convert...' : 'Enter binary (space-separated 8-bit values)...'}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'encode' ? 'Binary Output' : 'Text Output'}
              </label>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm bg-cyan-600 text-white px-3 py-1 rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono resize-none"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Input Length</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {input.length}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Output Length</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {output.length}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Binary Bytes</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'encode' ? input.length : output.length}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 About Binary:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Binary uses only 0 and 1 to represent data</li>
            <li>Each character is represented by 8 bits (1 byte)</li>
            <li>Computers process all data in binary format</li>
            <li>Example: 'A' = 01000001 in binary</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
