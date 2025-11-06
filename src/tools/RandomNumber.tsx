import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  const generateNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);

    if (isNaN(minNum) || isNaN(maxNum) || minNum >= maxNum) {
      return;
    }

    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    setResults(numbers);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Random Number Generator</h1>
        <p className="text-gray-600 text-lg">
          Generate random numbers within a specified range
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Value
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Value
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">
              How many numbers: {count}
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        <button
          onClick={generateNumbers}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Generate Random Number{count > 1 ? 's' : ''}</span>
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Generated Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map((num, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl border-2 border-blue-200 text-center"
              >
                <div className="text-4xl font-bold text-blue-600">{num}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
