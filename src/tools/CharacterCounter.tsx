import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function CharacterCounter() {
  const howItWorks = [
    { title: 'Enter Your Text', description: 'Type or paste the text you want to analyze' },
    { title: 'View Character Count', description: 'See total characters with and without spaces' },
    { title: 'Check Line Count', description: 'View how many lines are in your text' },
    { title: 'Copy Results', description: 'Use the copy button to save your analysis' }
  ];
  const [text, setText] = useState('');
  const withSpaces = text.length;
  const withoutSpaces = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Character Counter</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Count characters with and without spaces</p>
      <div className="mb-6">
        <HowItWorks steps={howItWorks} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border-2 border-primary-200 dark:border-primary-800">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">{withSpaces.toLocaleString()}</div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">With Spaces</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{withoutSpaces.toLocaleString()}</div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">Without Spaces</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{lines.toLocaleString()}</div>
          <div className="text-gray-700 dark:text-gray-300 font-medium">Lines</div>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full p-6 text-gray-800 dark:text-gray-200 dark:bg-gray-800 text-lg leading-relaxed resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      />
    </div>
  );
}

