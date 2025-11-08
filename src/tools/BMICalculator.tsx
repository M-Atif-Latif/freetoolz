import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  const getCategory = () => {
    if (!bmi) return { label: '', color: '' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600' };
    return { label: 'Obese', color: 'text-red-600' };
  };

  const category = getCategory();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">BMI Calculator</h1>
      <p className="text-gray-600 text-lg mb-8">Calculate your Body Mass Index</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none" />
          </div>
        </div>

        <button onClick={calculateBMI}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg">
          Calculate BMI
        </button>

        {bmi !== null && (
          <div className="mt-8 text-center">
            <div className="text-6xl font-bold text-gray-900 mb-2">{bmi}</div>
            <div className={`text-2xl font-semibold ${category.color}`}>{category.label}</div>
          </div>
        )}
      </div>
    </div>
  );
}
