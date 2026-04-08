import { useState } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysToAdd, setDaysToAdd] = useState('');
  const [result, setResult] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  };

  const calculateBusinessDays = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      setResult('Start date must be before end date');
      return;
    }

    let businessDays = 0;
    const current = new Date(start);

    while (current <= end) {
      if (!isWeekend(current)) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const weekendDays = totalDays - businessDays;

    setResult(`${businessDays} business days (${weekendDays} weekend days excluded)`);
  };

  const addBusinessDays = () => {
    if (!startDate || !daysToAdd) return;

    const start = new Date(startDate);
    const days = parseInt(daysToAdd);
    
    if (isNaN(days)) {
      setTargetDate('Invalid number of days');
      return;
    }

    let current = new Date(start);
    let addedDays = 0;

    while (addedDays < Math.abs(days)) {
      current.setDate(current.getDate() + (days > 0 ? 1 : -1));
      if (!isWeekend(current)) {
        addedDays++;
      }
    }

    setTargetDate(current.toISOString().split('T')[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Business Days Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Calculate business days between dates (excluding weekends)
          </p>
        </div>

        {/* Calculate Between Dates */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Count Business Days Between Dates</h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <button
              onClick={calculateBusinessDays}
              disabled={!startDate || !endDate}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Business Days
            </button>

            {result && (
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {result}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add/Subtract Business Days */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Add/Subtract Business Days</h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Business Days (+ or -)
                </label>
                <input
                  type="number"
                  value={daysToAdd}
                  onChange={(e) => setDaysToAdd(e.target.value)}
                  placeholder="e.g. 10 or -5"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={addBusinessDays}
                disabled={!startDate || !daysToAdd}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Days
              </button>
              <button
                onClick={() => {
                  setDaysToAdd(daysToAdd.startsWith('-') ? daysToAdd.slice(1) : `-${daysToAdd}`);
                }}
                disabled={!daysToAdd}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Minus className="h-5 w-5 mr-2" />
                Subtract Days
              </button>
            </div>

            {targetDate && targetDate !== 'Invalid number of days' && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Target Date:</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {new Date(targetDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">📅 Note</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• This calculator excludes weekends (Saturday & Sunday)</li>
            <li>• Public holidays are NOT excluded (varies by country)</li>
            <li>• Useful for project planning, delivery estimates, and deadlines</li>
            <li>• Business days = Monday through Friday only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
