import { useState } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError('Invalid JSON');
      setOutput('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">JSON Formatter</h1>
      <p className="text-gray-600 text-lg mb-8">Format and validate JSON data</p>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Input JSON</h2>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "value"}'
            className="w-full p-6 text-gray-800 resize-none focus:outline-none min-h-[400px] font-mono text-sm" />
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Formatted JSON</h2>
          </div>
          <textarea value={output} readOnly placeholder="Formatted output..."
            className="w-full p-6 text-gray-800 resize-none focus:outline-none min-h-[400px] font-mono text-sm bg-gray-50" />
        </div>
      </div>

      {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

      <div className="flex justify-center">
        <button onClick={formatJSON}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg">
          Format JSON
        </button>
      </div>
    </div>
  );
}
