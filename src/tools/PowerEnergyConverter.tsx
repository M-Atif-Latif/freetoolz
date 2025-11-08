import { useState } from 'react';
import { Zap, ArrowRightLeft } from 'lucide-react';

export default function PowerEnergyConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('watt');
  const [toUnit, setToUnit] = useState('kilowatt');
  const [result, setResult] = useState('');

  const units = {
    // Power
    watt: { name: 'Watt (W)', toWatt: 1 },
    kilowatt: { name: 'Kilowatt (kW)', toWatt: 1000 },
    megawatt: { name: 'Megawatt (MW)', toWatt: 1000000 },
    horsepower: { name: 'Horsepower (hp)', toWatt: 745.7 },
    btu_hr: { name: 'BTU/hour', toWatt: 0.293071 },
    
    // Energy
    joule: { name: 'Joule (J)', toWatt: 1 },
    kilojoule: { name: 'Kilojoule (kJ)', toWatt: 1000 },
    kilowatt_hour: { name: 'Kilowatt-hour (kWh)', toWatt: 3600000 },
    calorie: { name: 'Calorie (cal)', toWatt: 4.184 },
    kilocalorie: { name: 'Kilocalorie (kcal)', toWatt: 4184 },
    watt_hour: { name: 'Watt-hour (Wh)', toWatt: 3600 },
    electron_volt: { name: 'Electron Volt (eV)', toWatt: 1.602176634e-19 },
  };

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult('Invalid input');
      return;
    }

    const fromFactor = units[fromUnit as keyof typeof units].toWatt;
    const toFactor = units[toUnit as keyof typeof units].toWatt;
    
    const resultValue = (num * fromFactor) / toFactor;
    
    setResult(resultValue.toExponential(6));
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result) convert();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Power & Energy Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert between watts, kilowatts, horsepower, joules, kWh, and more
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Convert Units</h2>
          </div>
          <div className="p-8">
            {/* From */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                From
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <optgroup label="Power">
                    <option value="watt">Watt (W)</option>
                    <option value="kilowatt">Kilowatt (kW)</option>
                    <option value="megawatt">Megawatt (MW)</option>
                    <option value="horsepower">Horsepower (hp)</option>
                    <option value="btu_hr">BTU/hour</option>
                  </optgroup>
                  <optgroup label="Energy">
                    <option value="joule">Joule (J)</option>
                    <option value="kilojoule">Kilojoule (kJ)</option>
                    <option value="watt_hour">Watt-hour (Wh)</option>
                    <option value="kilowatt_hour">Kilowatt-hour (kWh)</option>
                    <option value="calorie">Calorie (cal)</option>
                    <option value="kilocalorie">Kilocalorie (kcal)</option>
                    <option value="electron_volt">Electron Volt (eV)</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={swap}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                <ArrowRightLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* To */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <optgroup label="Power">
                  <option value="watt">Watt (W)</option>
                  <option value="kilowatt">Kilowatt (kW)</option>
                  <option value="megawatt">Megawatt (MW)</option>
                  <option value="horsepower">Horsepower (hp)</option>
                  <option value="btu_hr">BTU/hour</option>
                </optgroup>
                <optgroup label="Energy">
                  <option value="joule">Joule (J)</option>
                  <option value="kilojoule">Kilojoule (kJ)</option>
                  <option value="watt_hour">Watt-hour (Wh)</option>
                  <option value="kilowatt_hour">Kilowatt-hour (kWh)</option>
                  <option value="calorie">Calorie (cal)</option>
                  <option value="kilocalorie">Kilocalorie (kcal)</option>
                  <option value="electron_volt">Electron Volt (eV)</option>
                </optgroup>
              </select>
            </div>

            <button
              onClick={convert}
              className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all mb-6"
            >
              Convert
            </button>

            {/* Result */}
            {result && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white break-all">
                  {result} {units[toUnit as keyof typeof units].name.split('(')[1]?.replace(')', '')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Reference</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• 1 Kilowatt (kW) = 1,000 Watts</li>
            <li>• 1 Horsepower (hp) = 745.7 Watts</li>
            <li>• 1 Kilowatt-hour (kWh) = 3.6 Megajoules</li>
            <li>• 1 Calorie = 4.184 Joules</li>
            <li>• 1 BTU/hour = 0.293 Watts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
