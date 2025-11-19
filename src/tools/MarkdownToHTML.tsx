import { useState } from 'react';

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Markdown to HTML</h1>
      <p className="text-gray-600 text-lg mb-6">Convert Markdown to HTML instantly</p>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Markdown</h2>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="# Heading&#10;**Bold text**"
            className="w-full p-6 text-gray-800 font-mono text-sm leading-relaxed resize-none focus:outline-none min-h-[500px]"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">HTML Output</h2>
          </div>
          <textarea
            value={convertToHTML(markdown)}
            readOnly
            className="w-full p-6 text-gray-800 font-mono text-sm leading-relaxed resize-none focus:outline-none min-h-[500px] bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
