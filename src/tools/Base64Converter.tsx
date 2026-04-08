import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (err) {
      setOutput('Error: Invalid input');
    }
  };

  const howItWorks = [
    { title: 'Select Mode', description: 'Choose between Encode (text to Base64) or Decode (Base64 to text)' },
    { title: 'Enter Text', description: 'Paste or type your text in the input field' },
    { title: 'Click Convert', description: 'Instantly converts your input to the selected format' },
    { title: 'Copy Result', description: 'Click the Copy button to save your output to clipboard' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Base64 Encoder/Decoder</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Encode or decode Base64 strings instantly</p>
      
      <HowItWorks steps={howItWorks} />

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border-2 border-gray-200 bg-white p-1">
          <button onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${mode === 'encode' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700'}`}>
            Encode
          </button>
          <button onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${mode === 'decode' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700'}`}>
            Decode
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Input</h2>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..."
            className="w-full p-6 text-gray-800 resize-none focus:outline-none min-h-[300px] font-mono text-sm" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Output</h2>
            {output && <CopyButton text={output} label="Copy Result" size="sm" />}
          </div>
          <textarea value={output} readOnly placeholder="Result will appear here..."
            className="w-full p-6 text-gray-800 dark:text-gray-200 resize-none focus:outline-none min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800" />
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={handleConvert}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg">
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </button>
      </div>
    </div>
  );
}
