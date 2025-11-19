import { useState } from 'react';
import { currencies, formatCurrency, getDefaultCurrency } from '../data/currencies';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);
  const [currency, setCurrency] = useState(getDefaultCurrency());

  const tipAmount = (parseFloat(bill) * tipPercent) / 100 || 0;
  const total = parseFloat(bill) + tipAmount || 0;
  const perPerson = total / people || 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Tip Calculator</h1>
      <p className="text-gray-600 text-lg mb-6">Calculate tips and split bills with multi-currency support</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bill Amount
            </label>
            <input
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              placeholder="100.00"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none text-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none text-lg"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6">
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Tip: {tipPercent}%</label>
          <input
            type="range"
            min="0"
            max="30"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">Split Between: {people} {people === 1 ? 'person' : 'people'}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Tip Amount</div>
            <div className="text-3xl font-bold text-blue-600">{formatCurrency(tipAmount, currency)}</div>
          </div>
          <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(total, currency)}</div>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 text-center">
            <div className="text-sm text-gray-600 mb-1">Per Person</div>
            <div className="text-3xl font-bold text-purple-600">{formatCurrency(perPerson, currency)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
