import { useState } from 'react';
import { Hash } from 'lucide-react';

export default function HexCalculator() {
  const [hex1, setHex1] = useState('');
  const [hex2, setHex2] = useState('');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('+');

  const calculate = () => {
    try {
      const num1 = parseInt(hex1, 16);
      const num2 = parseInt(hex2, 16);
      let res = 0;
      switch (operation) {
        case '+': res = num1 + num2; break;
        case '-': res = num1 - num2; break;
        case '*': res = num1 * num2; break;
        case '/': res = Math.floor(num1 / num2); break;
      }
      setResult(res.toString(16).toUpperCase());
    } catch { setResult('Invalid input'); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Hash className="h-16 w-16 mx-auto text-purple-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Hex Calculator</h1>
        <p className="text-gray-600 text-lg">Perform hexadecimal arithmetic</p>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <input type="text" value={hex1} onChange={(e) => setHex1(e.target.value.replace(/[^0-9a-fA-F]/g, ''))} placeholder="1A2B" className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg font-mono text-2xl focus:border-purple-500 outline-none" />
          <div className="grid grid-cols-4 gap-3">
            {['+', '-', '*', '/'].map(op => (
              <button key={op} onClick={() => setOperation(op)} className={`px-6 py-4 rounded-lg font-bold text-2xl ${operation === op ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>{op}</button>
            ))}
          </div>
          <input type="text" value={hex2} onChange={(e) => setHex2(e.target.value.replace(/[^0-9a-fA-F]/g, ''))} placeholder="3C4D" className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg font-mono text-2xl focus:border-purple-500 outline-none" />
          <button onClick={calculate} className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 font-semibold text-lg shadow-lg">Calculate</button>
          {result && (
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Result (Hex)</p>
              <p className="text-4xl font-bold font-mono text-gray-900">{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
