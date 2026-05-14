import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function DuplicateLineRemover() {
  const howItWorks = [
    { title: 'Paste Your Text', description: 'Enter text with multiple lines' },
    { title: 'Remove Duplicates', description: 'Click to eliminate duplicate lines' },
    { title: 'View Result', description: 'See your unique lines only' },
    { title: 'Copy Text', description: 'Save your deduplicated text' }
  ];
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const removeDuplicates = () => {
    const lines = input.split('\n');
    const unique = [...new Set(lines)];
    setOutput(unique.join('\n'));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Duplicate Line Remover</h1>
      <p className="text-gray-600 text-lg mb-6">Remove duplicate lines from your text</p>

      <HowItWorks steps={howItWorks} />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Line 1&#10;Line 2&#10;Line 1&#10;Line 3"
          className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200"
        />
        <textarea
          value={output}
          readOnly
          placeholder="Output..."
          className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] bg-gray-50 rounded-xl shadow-lg border border-gray-200"
        />
      </div>
      <button
        onClick={removeDuplicates}
        className="w-full px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-lg shadow-lg"
      >
        Remove Duplicates
      </button>
    </div>
  );
}


