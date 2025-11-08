import { useState } from 'react';

export default function LineSorter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const sortLines = (ascending: boolean) => {
    const lines = input.split('\n').filter(line => line.trim());
    const sorted = ascending ? lines.sort() : lines.sort().reverse();
    setOutput(sorted.join('\n'));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Line Sorter</h1>
      <p className="text-gray-600 text-lg mb-6">Sort lines alphabetically</p>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter lines to sort..."
          className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200"
        />
        <textarea
          value={output}
          readOnly
          placeholder="Sorted output..."
          className="w-full p-6 text-gray-800 leading-relaxed resize-none focus:outline-none min-h-[400px] bg-gray-50 rounded-xl shadow-lg border border-gray-200"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => sortLines(true)}
          className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
        >
          Sort A-Z
        </button>
        <button
          onClick={() => sortLines(false)}
          className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          Sort Z-A
        </button>
      </div>
    </div>
  );
}
