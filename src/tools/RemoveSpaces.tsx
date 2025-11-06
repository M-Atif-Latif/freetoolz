import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function RemoveSpaces() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const removeExtraSpaces = () => {
    setOutput(input.replace(/\s+/g, ' ').trim());
  };

  const removeAllSpaces = () => {
    setOutput(input.replace(/\s/g, ''));
  };

  const removeLeadingTrailing = () => {
    setOutput(input.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Remove Extra Spaces</h1>
        <p className="text-gray-600 text-lg">
          Clean up extra whitespace from your text
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Input Text</h2>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with extra spaces..."
            className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px]"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Cleaned Text</h2>
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
            placeholder="Cleaned text will appear here..."
            className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] bg-gray-50"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={removeExtraSpaces}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
        >
          Remove Extra Spaces
        </button>
        <button
          onClick={removeAllSpaces}
          className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          Remove All Spaces
        </button>
        <button
          onClick={removeLeadingTrailing}
          className="px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold shadow-lg"
        >
          Trim Leading/Trailing
        </button>
      </div>
    </div>
  );
}
