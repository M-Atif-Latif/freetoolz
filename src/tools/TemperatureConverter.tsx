import { useState } from 'react';
import { Thermometer } from 'lucide-react';

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    } else {
      setFahrenheit('');
      setKelvin('');
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      setCelsius(((f - 32) * 5/9).toFixed(2));
      setKelvin((((f - 32) * 5/9) + 273.15).toFixed(2));
    } else {
      setCelsius('');
      setKelvin('');
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    const k = parseFloat(value);
    if (!isNaN(k)) {
      setCelsius((k - 273.15).toFixed(2));
      setFahrenheit((((k - 273.15) * 9/5) + 32).toFixed(2));
    } else {
      setCelsius('');
      setFahrenheit('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Thermometer className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Temperature Converter</h1>
        <p className="text-gray-600 text-lg">Convert between Celsius, Fahrenheit, and Kelvin</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <label className="block text-sm font-bold text-blue-900 mb-3">Celsius (°C)</label>
            <input
              type="number"
              value={celsius}
              onChange={(e) => handleCelsiusChange(e.target.value)}
              placeholder="0"
              className="w-full px-4 py-4 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none text-2xl font-bold"
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-100 rounded-xl border border-orange-200">
            <label className="block text-sm font-bold text-orange-900 mb-3">Fahrenheit (°F)</label>
            <input
              type="number"
              value={fahrenheit}
              onChange={(e) => handleFahrenheitChange(e.target.value)}
              placeholder="32"
              className="w-full px-4 py-4 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all outline-none text-2xl font-bold"
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <label className="block text-sm font-bold text-purple-900 mb-3">Kelvin (K)</label>
            <input
              type="number"
              value={kelvin}
              onChange={(e) => handleKelvinChange(e.target.value)}
              placeholder="273.15"
              className="w-full px-4 py-4 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all outline-none text-2xl font-bold"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Quick Reference</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Water freezes: 0°C = 32°F = 273.15K</p>
            <p>• Water boils: 100°C = 212°F = 373.15K</p>
            <p>• Room temperature: ~20°C = 68°F = 293K</p>
          </div>
        </div>
      </div>
    </div>
  );
}
