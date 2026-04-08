import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function JSMinifier() {
  const howItWorks = [
    { title: 'Paste JavaScript Code', description: 'Enter your JavaScript code' },
    { title: 'Click Minify', description: 'Remove unnecessary characters and whitespace' },
    { title: 'View Result', description: 'See your minified JavaScript code' },
    { title: 'Copy Code', description: 'Use the copy button to save your minified code' }
  ];

  const [input, setInput] = useState('function hello() {\n  // This is a comment\n  const message = "world";\n  return message;\n}');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minify = () => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}():;,=\[\]])\s*/g, '$1')
      .trim();
    setOutput(minified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setInput('function hello() {\n  // This is a comment\n  const message = "world";\n  return message;\n}');
    setOutput('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">JavaScript Minifier</h1>
      <p className="text-gray-600 text-lg mb-8">Minify JavaScript code to reduce file size and improve load times</p>

      <HowItWorks steps={howItWorks} />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JavaScript Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="function hello() { return 'world'; }"
            className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minified Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-gray-50 rounded-xl shadow-lg border border-gray-200"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={minify}
          className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
        >
          Minify JavaScript
        </button>
        <button
          onClick={reset}
          className="px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold text-lg shadow-lg flex items-center gap-2"
        >
          <RotateCcw className="h-5 w-5" /> Reset
        </button>
      </div>

      {output && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
          <p className="text-sm text-green-700 mb-2">
            <strong>Size Reduction:</strong> Original: {input.length} bytes → Minified: {output.length} bytes ({((1 - output.length / input.length) * 100).toFixed(1)}% smaller)
          </p>
        </div>
      )}

      {output && (
        <button
          onClick={copyToClipboard}
          className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          {copied ? 'Copied to Clipboard!' : 'Copy Minified JavaScript'}
        </button>
      )}
    </div>
  );
}

