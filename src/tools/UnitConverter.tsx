import { useState } from 'react';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState('meters');
  const [to, setTo] = useState('feet');

  const conversions: { [key: string]: number } = {
    meters: 1,
    feet: 3.28084,
    inches: 39.3701,
    kilometers: 0.001,
    miles: 0.000621371,
    yards: 1.09361,
  };

  const convert = () => {
    const val = parseFloat(value);
    if (!isNaN(val)) {
      const inMeters = val / conversions[from];
      return (inMeters * conversions[to]).toFixed(4);
    }
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Unit Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert between different units of measurement</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
              {Object.keys(conversions).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg">
              {Object.keys(conversions).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
        </div>
        {value && (
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">{convert()}</div>
            <div className="text-gray-600">{to}</div>
          </div>
        )}
      </div>
    </div>
  );
}
