import { useState } from 'react';
import { currencies, formatCurrency, getDefaultCurrency } from '../data/currencies';

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [currency, setCurrency] = useState(getDefaultCurrency());

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    if (p && r && t) {
      const amount = p * Math.pow(1 + r, t);
      setResult(amount);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Compound Interest Calculator</h1>
      <p className="text-gray-600 text-lg mb-6">Calculate compound interest on investments in any currency</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          >
            {currencies.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} - {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Principal</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="10000"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="5"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time (years)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="10"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-6"
        >
          Calculate
        </button>
        {result && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600 mb-1">Final Amount</div>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(result, currency)}</div>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-gray-600 mb-1">Interest Earned</div>
              <div className="text-3xl font-bold text-blue-600">{formatCurrency(result - parseFloat(principal), currency)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
