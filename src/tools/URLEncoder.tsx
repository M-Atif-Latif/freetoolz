import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleConvert = () => {
    setError('');
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (err) {
      setError('Invalid input for ' + mode + '. Please check your data.');
      setOutput('');
    }
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
  };

  const howItWorks = [
    { title: 'Select Mode', description: 'Choose between Encode (text to URL-safe format) or Decode (URL format back to text)' },
    { title: 'Enter URL', description: 'Paste your URL or text that needs encoding/decoding' },
    { title: 'Click Convert', description: 'Instantly converts special characters for safe URL transmission' },
    { title: 'Copy Result', description: 'Click Copy button to save the converted URL to clipboard' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">URL Encoder/Decoder</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Encode or decode URL strings for safe web transmission
        </p>
      </div>

      <HowItWorks steps={howItWorks} />

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border-2 border-gray-200 bg-white p-1">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              mode === 'encode'
                ? 'bg-accent-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              mode === 'decode'
                ? 'bg-accent-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {mode === 'encode' ? 'Plain URL' : 'Encoded URL'}
            </h2>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'https://example.com/path?query=value' : 'https%3A%2F%2Fexample.com%2Fpath%3Fquery%3Dvalue'}
            className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] font-mono text-sm"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {mode === 'encode' ? 'Encoded URL' : 'Plain URL'}
            </h2>
            {output && (
              <CopyButton text={output} label="Copy Result" size="sm" />
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full p-6 text-gray-800 dark:text-gray-200 leading-relaxed resize-none focus:outline-none min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleConvert}
          className="px-8 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-lg"
        >
          {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
        </button>
        <button
          onClick={switchMode}
          className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold shadow-lg"
        >
          Switch Mode
        </button>
      </div>
    </div>
  );
}

