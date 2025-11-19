import { useState } from 'react';
import { currencies, formatCurrency, getDefaultCurrency } from '../data/currencies';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState<number | null>(null);
  const [currency, setCurrency] = useState(getDefaultCurrency());

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (p && r && n) {
      const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthly(payment);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Loan Calculator</h1>
      <p className="text-gray-600 text-lg mb-6">Calculate monthly loan payments in any currency</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="200000"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="3.5"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Term (years)</label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>
        <button
          onClick={calculate}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-6"
        >
          Calculate Payment
        </button>
        {monthly && (
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl">
            <div className="text-sm text-gray-600 mb-2">Monthly Payment</div>
            <div className="text-5xl font-bold text-blue-600 mb-4">{formatCurrency(monthly, currency)}</div>
            <div className="text-gray-600">Total: {formatCurrency(monthly * parseFloat(years) * 12, currency)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
