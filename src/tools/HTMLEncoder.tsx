import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function HTMLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const entities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  const convert = () => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, m => entities[m]));
    } else {
      let decoded = input;
      Object.entries(entities).forEach(([char, entity]) => {
        decoded = decoded.replace(new RegExp(entity, 'g'), char);
      });
      setOutput(decoded);
    }
  };

  const howItWorks = [
    { title: 'Select Mode', description: 'Choose between Encode (HTML to safe entities) or Decode (entities back to HTML)' },
    { title: 'Enter HTML', description: 'Paste your HTML code or entities that need converting' },
    { title: 'Click Convert', description: 'Instantly converts special HTML characters to safe entities' },
    { title: 'Copy Result', description: 'Use the copy button to save the converted HTML to clipboard' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">HTML Entity Encoder/Decoder</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Convert HTML characters to safe entities and vice versa</p>

      <HowItWorks steps={howItWorks} />
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1">
          <button onClick={() => setMode('encode')} className={`px-6 py-2 rounded-md font-medium transition-all ${mode === 'encode' ? 'bg-accent-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`px-6 py-2 rounded-md font-medium transition-all ${mode === 'decode' ? 'bg-accent-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>Decode</button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="font-semibold text-gray-900 dark:text-white">{mode === 'encode' ? 'HTML Code' : 'Encoded Entities'}</h2>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? '<div class="example">Click me!</div>' : '&lt;div class=&quot;example&quot;&gt;Click me!&lt;/div&gt;'} className="w-full p-6 text-gray-800 dark:text-gray-200 font-mono text-sm resize-none focus:outline-none min-h-[400px] dark:bg-gray-800" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">{mode === 'decode' ? 'HTML Code' : 'Encoded Entities'}</h2>
            {output && <CopyButton text={output} label="Copy Result" size="sm" />}
          </div>
          <textarea value={output} readOnly placeholder="Output will appear here..." className="w-full p-6 text-gray-800 dark:text-gray-200 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-gray-50 dark:bg-gray-800" />
        </div>
      </div>
      <button onClick={convert} className="w-full px-6 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg transition-colors font-semibold">
        {mode === 'encode' ? 'Encode to HTML Entities' : 'Decode from HTML Entities'}
      </button>
    </div>
  );
}

