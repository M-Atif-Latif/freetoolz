import { useState } from 'react';

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [increase, setIncrease] = useState('');
  const [decrease, setDecrease] = useState('');

  const calculatePercentage = () => {
    const v = parseFloat(value);
    const p = parseFloat(percentage);
    if (!isNaN(v) && !isNaN(p)) {
      return ((v * p) / 100).toFixed(2);
    }
    return '';
  };

  const calculateIncrease = () => {
    const v = parseFloat(value);
    const i = parseFloat(increase);
    if (!isNaN(v) && !isNaN(i)) {
      return (v + (v * i) / 100).toFixed(2);
    }
    return '';
  };

  const calculateDecrease = () => {
    const v = parseFloat(value);
    const d = parseFloat(decrease);
    if (!isNaN(v) && !isNaN(d)) {
      return (v - (v * d) / 100).toFixed(2);
    }
    return '';
  };

  const percentOf = calculatePercentage();
  const increased = calculateIncrease();
  const decreased = calculateDecrease();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Percentage Calculator</h1>
        <p className="text-gray-600 text-lg">
          Calculate percentages, increases, and decreases easily
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What is X% of Y?</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Percentage (%)
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="25"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Of Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="200"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>
          {percentOf && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{percentOf}</div>
                <div className="text-gray-700">
                  {percentage}% of {value} is {percentOf}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Increase by Percentage</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Increase (%)
              </label>
              <input
                type="number"
                value={increase}
                onChange={(e) => setIncrease(e.target.value)}
                placeholder="10"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>
          {increased && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{increased}</div>
                <div className="text-gray-700">
                  {value} + {increase}% = {increased}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Decrease by Percentage</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Decrease (%)
              </label>
              <input
                type="number"
                value={decrease}
                onChange={(e) => setDecrease(e.target.value)}
                placeholder="20"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>
          </div>
          {decreased && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">{decreased}</div>
                <div className="text-gray-700">
                  {value} - {decrease}% = {decreased}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
