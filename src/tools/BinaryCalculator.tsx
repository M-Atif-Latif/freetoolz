import { useState } from 'react';
import { Binary } from 'lucide-react';

export default function BinaryCalculator() {
  const [binary1, setBinary1] = useState('');
  const [binary2, setBinary2] = useState('');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('+');

  const calculate = () => {
    try {
      const num1 = parseInt(binary1, 2);
      const num2 = parseInt(binary2, 2);
      let res = 0;

      switch (operation) {
        case '+': res = num1 + num2; break;
        case '-': res = num1 - num2; break;
        case '*': res = num1 * num2; break;
        case '/': res = Math.floor(num1 / num2); break;
      }

      setResult(res.toString(2));
    } catch {
      setResult('Invalid input');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Binary className="h-16 w-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Binary Calculator</h1>
        <p className="text-gray-600 text-lg">Perform binary arithmetic operations</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Binary Number 1</label>
            <input
              type="text"
              value={binary1}
              onChange={(e) => setBinary1(e.target.value.replace(/[^01]/g, ''))}
              placeholder="1010"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg font-mono text-2xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Operation</label>
            <div className="grid grid-cols-4 gap-3">
              {['+', '-', '*', '/'].map(op => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className={`px-6 py-4 rounded-lg font-bold text-2xl transition-all ${
                    operation === op
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Binary Number 2</label>
            <input
              type="text"
              value={binary2}
              onChange={(e) => setBinary2(e.target.value.replace(/[^01]/g, ''))}
              placeholder="1100"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg font-mono text-2xl focus:border-green-500 focus:ring focus:ring-green-200 transition-all outline-none"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold text-lg shadow-lg"
          >
            Calculate
          </button>

          {result && (
            <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
              <p className="text-sm text-gray-600 mb-2">Result (Binary)</p>
              <p className="text-4xl font-bold font-mono text-gray-900 mb-3">{result}</p>
              <p className="text-sm text-gray-600">Decimal: {parseInt(result, 2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
