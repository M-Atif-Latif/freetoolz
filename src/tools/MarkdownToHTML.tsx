import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function MarkdownToHTML() {
  const [markdown, setMarkdown] = useState('');

  const convertToHTML = (md: string) => {
    return md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n/gim, '<br>');
  };

  const html = convertToHTML(markdown);

  const howItWorks = [
    { title: 'Write Markdown', description: 'Use standard Markdown syntax: # for headings, ** for bold, * for italic' },
    { title: 'See HTML Preview', description: 'Instantly converts your Markdown to proper HTML code' },
    { title: 'Copy or Use', description: 'Copy the HTML output to use in your projects' },
    { title: 'Syntax Support', description: 'Supports headings, bold, italic, and line breaks' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Markdown to HTML</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Convert Markdown to HTML instantly</p>
      
      <HowItWorks steps={howItWorks} />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <h2 className="font-semibold text-gray-900 dark:text-white">Markdown</h2>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Heading&#10;**Bold text**&#10;*Italic text*"
            className="w-full p-6 text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed resize-none focus:outline-none min-h-[500px] dark:bg-gray-800"
          />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">HTML Output</h2>
            {html && <CopyButton text={html} label="Copy HTML" size="sm" />}
          </div>
          <textarea
            value={html}
            readOnly
            className="w-full p-6 text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed resize-none focus:outline-none min-h-[500px] bg-gray-50 dark:bg-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

