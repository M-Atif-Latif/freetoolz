import { useState } from 'react';
import { Fuel } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';
import { currencies, formatCurrency, getDefaultCurrency } from '../data/currencies';

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [unit, setUnit] = useState<'km' | 'miles'>('km');
  const [efficiencyUnit, setEfficiencyUnit] = useState<'l/100km' | 'mpg'>('l/100km');
  const [currency, setCurrency] = useState(getDefaultCurrency());

  const calculateCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);

    if (!dist || !efficiency || !price) return null;

    let fuelNeeded: number;

    if (efficiencyUnit === 'l/100km') {
      // Liters per 100km
      fuelNeeded = (dist / 100) * efficiency;
    } else {
      // Miles per gallon - convert to liters
      fuelNeeded = (dist / efficiency) * 3.78541; // 1 gallon = 3.78541 liters
    }

    const totalCost = fuelNeeded * price;

    return {
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerUnit: (totalCost / dist).toFixed(3)
    };
  };

  const result = calculateCost();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
            <Fuel className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fuel Cost Calculator</h1>
            <p className="text-gray-600 dark:text-gray-400">Calculate your trip's fuel cost</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Distance
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="100"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'km' | 'miles')}
                  className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="km">km</option>
                  <option value="miles">miles</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuel Efficiency
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={fuelEfficiency}
                  onChange={(e) => setFuelEfficiency(e.target.value)}
                  placeholder="7.5"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select
                  value={efficiencyUnit}
                  onChange={(e) => setEfficiencyUnit(e.target.value as 'l/100km' | 'mpg')}
                  className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="l/100km">L/100km</option>
                  <option value="mpg">MPG</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fuel Price per Liter
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="1.50"
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {result && (
            <div className="mt-8 space-y-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Trip Cost</h2>
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  {formatCurrency(parseFloat(result.totalCost), currency)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fuel Needed</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {result.fuelNeeded} L
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cost per {unit}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(parseFloat(result.costPerUnit), currency)}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Trip Summary:</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Distance: {distance} {unit}</li>
                  <li>• Fuel Efficiency: {fuelEfficiency} {efficiencyUnit}</li>
                  <li>• Fuel Price: {formatCurrency(parseFloat(fuelPrice), currency)}/L</li>
                  <li>• Total Fuel: {result.fuelNeeded} liters</li>
                  <li>• Total Cost: {formatCurrency(parseFloat(result.totalCost), currency)}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🚗 Fuel Saving Tips:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Maintain steady speed and avoid rapid acceleration</li>
            <li>Keep tires properly inflated</li>
            <li>Remove unnecessary weight from vehicle</li>
            <li>Use cruise control on highways</li>
            <li>Regular vehicle maintenance improves efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
