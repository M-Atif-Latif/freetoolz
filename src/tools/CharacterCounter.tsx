import { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');
  const withSpaces = text.length;
  const withoutSpaces = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Character Counter</h1>
      <p className="text-gray-600 text-lg mb-6">Count characters with and without spaces</p>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-1">{withSpaces.toLocaleString()}</div>
          <div className="text-gray-700 font-medium">With Spaces</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-1">{withoutSpaces.toLocaleString()}</div>
          <div className="text-gray-700 font-medium">Without Spaces</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-1">{lines.toLocaleString()}</div>
          <div className="text-gray-700 font-medium">Lines</div>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full p-6 text-gray-800 text-lg leading-relaxed resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200"
      />
    </div>
  );
}
