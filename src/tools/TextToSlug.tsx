import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function TextToSlug() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Text to Slug Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert text to URL-friendly slugs</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Input Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hello World 2024!"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          />
        </div>
        {slug && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
            <code className="text-blue-600 font-mono text-lg">{slug}</code>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
