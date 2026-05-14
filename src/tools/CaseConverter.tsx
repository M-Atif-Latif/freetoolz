import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const howItWorks = [
    { title: 'Enter Your Text', description: 'Type or paste your text into the input field' },
    { title: 'Choose Format', description: 'Click on any case option: UPPERCASE, lowercase, or Title Case' },
    { title: 'View Results', description: 'See the converted text instantly in real-time' },
    { title: 'Copy Output', description: 'Use copy buttons to save your formatted text' },
  ];

  const uppercase = text.toUpperCase();
  const lowercase = text.toLowerCase();
  const titlecase = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Case Converter</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Convert text between different letter cases</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="font-semibold text-gray-900 dark:text-white">Enter Your Text</h2>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..."
          className="w-full p-6 text-gray-800 dark:text-gray-200 text-lg leading-relaxed resize-none focus:outline-none min-h-[200px] dark:bg-gray-800" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">UPPERCASE</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Convert to all caps</p>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 min-h-[60px] font-mono text-sm text-gray-800 dark:text-gray-200 break-words">
            {uppercase || 'Preview'}
          </div>
          <CopyButton text={uppercase} label="Copy" size="sm" />
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">lowercase</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Convert to all lowercase</p>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 min-h-[60px] font-mono text-sm text-gray-800 dark:text-gray-200 break-words">
            {lowercase || 'Preview'}
          </div>
          <CopyButton text={lowercase} label="Copy" size="sm" />
        </div>

        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Title Case</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Capitalize each word</p>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 min-h-[60px] font-mono text-sm text-gray-800 dark:text-gray-200 break-words">
            {titlecase || 'Preview'}
          </div>
          <CopyButton text={titlecase} label="Copy" size="sm" />
        </div>
      </div>
    </div>
  );
}

