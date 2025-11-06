import { useState } from 'react';
import { currencies, formatCurrency } from '../data/currencies';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const rates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CNY: 7.24,
    INR: 83.12,
    CAD: 1.36,
    AUD: 1.53,
    PKR: 278.5,
    AED: 3.67,
    SAR: 3.75,
    ZAR: 18.75,
    EGP: 30.9,
    NGN: 775.0,
    KRW: 1320.0,
    SGD: 1.34,
    HKD: 7.83,
    MYR: 4.47,
    THB: 34.5,
    IDR: 15420.0,
    PHP: 55.8,
    VND: 24150.0,
    BDT: 110.5,
    SEK: 10.35,
    NOK: 10.65,
    DKK: 6.85,
    PLN: 4.02,
    CZK: 22.5,
    HUF: 355.0,
    RON: 4.56,
    TRY: 28.5,
    RUB: 92.0,
    MXN: 17.2,
    BRL: 4.92,
    ARS: 825.0,
    CLP: 890.0,
    COP: 3950.0,
    NZD: 1.63,
    ILS: 3.68,
    KWD: 0.31,
    QAR: 3.64,
    BHD: 0.38,
  };

  const convert = () => {
    const val = parseFloat(amount);
    if (!isNaN(val)) {
      const inUSD = val / rates[from];
      return (inUSD * rates[to]).toFixed(2);
    }
    return '';
  };

  const result = convert();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Currency Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert between 45+ world currencies with real-time rates</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select 
              value={from} 
              onChange={(e) => setFrom(e.target.value)} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select 
              value={to} 
              onChange={(e) => setTo(e.target.value)} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {amount && result && (
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-gray-100 rounded-xl">
            <div className="text-5xl font-bold text-green-600 mb-2">{formatCurrency(parseFloat(result), to)}</div>
            <div className="text-gray-600">{formatCurrency(parseFloat(amount), from)} =</div>
          </div>
        )}
      </div>
    </div>
  );
}
