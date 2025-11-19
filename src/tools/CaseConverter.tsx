import { useState } from 'react';

export default function CaseConverter() {
  const [text, setText] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Case Converter</h1>
      <p className="text-gray-600 text-lg mb-8">Convert text between different letter cases</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Enter Your Text</h2>
        </div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..."
          className="w-full p-6 text-gray-800 text-lg leading-relaxed resize-none focus:outline-none min-h-[200px]" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button onClick={() => setText(text.toUpperCase())}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 mb-1">UPPERCASE</h3>
          <p className="text-sm text-gray-500">Convert to all caps</p>
        </button>
        <button onClick={() => setText(text.toLowerCase())}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 mb-1">lowercase</h3>
          <p className="text-sm text-gray-500">Convert to all lowercase</p>
        </button>
        <button onClick={() => setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()))}
          className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all">
          <h3 className="font-semibold text-gray-900 mb-1">Title Case</h3>
          <p className="text-sm text-gray-500">Capitalize each word</p>
        </button>
      </div>
    </div>
  );
}
