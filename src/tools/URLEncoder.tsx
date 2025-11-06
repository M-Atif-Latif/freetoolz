import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
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

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">URL Encoder/Decoder</h1>
        <p className="text-gray-600 text-lg">
          Encode or decode URL strings for safe web transmission
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border-2 border-gray-200 bg-white p-1">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              mode === 'encode'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              mode === 'decode'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
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

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">
              {mode === 'encode' ? 'Encoded URL' : 'Plain URL'}
            </h2>
            {output && (
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] font-mono text-sm bg-gray-50"
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
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
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
