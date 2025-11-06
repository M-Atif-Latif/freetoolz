import { useState } from 'react';
import { currencies, formatCurrency, getDefaultCurrency } from '../data/currencies';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [currency, setCurrency] = useState(getDefaultCurrency());

  const discountAmount = (parseFloat(price) * parseFloat(discount)) / 100 || 0;
  const finalPrice = parseFloat(price) - discountAmount || 0;
  const savings = discountAmount;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Discount Calculator</h1>
      <p className="text-gray-600 text-lg mb-6">Calculate discounted prices and savings in any currency</p>
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
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100.00"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
        </div>
        {price && discount && (
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
              <div className="text-sm text-gray-600 mb-1">You Save</div>
              <div className="text-3xl font-bold text-red-600">{formatCurrency(savings, currency)}</div>
            </div>
            <div className="p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <div className="text-sm text-gray-600 mb-1">Final Price</div>
              <div className="text-3xl font-bold text-green-600">{formatCurrency(finalPrice, currency)}</div>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <div className="text-sm text-gray-600 mb-1">Discount</div>
              <div className="text-3xl font-bold text-blue-600">{discount}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
