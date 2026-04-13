import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function TimeCalculator() {
  const howItWorks = [
    { title: 'Enter Hours & Minutes', description: 'Input the starting time hours and minutes' },
    { title: 'Choose Operation', description: 'Select whether to add or subtract time' },
    { title: 'Set Duration', description: 'Enter hours and minutes to add or subtract' },
    { title: 'View Result', description: 'See the calculated time instantly' }
  ];

  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('30');
  const [opType, setOpType] = useState('add');
  const [opHours, setOpHours] = useState('1');
  const [opMinutes, setOpMinutes] = useState('0');

  const calculate = () => {
    let h = parseInt(hours) || 0;
    let m = parseInt(minutes) || 0;
    const opH = parseInt(opHours) || 0;
    const opM = parseInt(opMinutes) || 0;

    if (opType === 'add') {
      m += opM;
      h += opH;
    } else {
      m -= opM;
      h -= opH;
    }

    while (m < 0) {
      m += 60;
      h -= 1;
    }
    while (m >= 60) {
      m -= 60;
      h += 1;
    }

    if (h < 0) h = 24 + (h % 24);
    h = h % 24;

    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  const result = calculate();

  const reset = () => {
    setHours('12');
    setMinutes('30');
    setOpHours('1');
    setOpMinutes('0');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Time Calculator</h1>
      <p className="text-gray-600 text-lg mb-8">Add and subtract hours and minutes quickly</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Starting Time</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none text-lg font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none text-lg font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Operation</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Add or Subtract</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setOpType('add')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    opType === 'add'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Plus className="h-5 w-5" /> Add
                </button>
                <button
                  onClick={() => setOpType('subtract')}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    opType === 'subtract'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Minus className="h-5 w-5" /> Subtract
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration to {opType === 'add' ? 'Add' : 'Subtract'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
              <input
                type="number"
                min="0"
                value={opHours}
                onChange={(e) => setOpHours(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-primary-500 outline-none text-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minutes</label>
              <input
                type="number"
                min="0"
                max="59"
                value={opMinutes}
                onChange={(e) => setOpMinutes(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-primary-500 outline-none text-lg font-mono"
              />
            </div>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-300 mb-6 text-center">
          <div className="text-sm text-gray-600 mb-2">Result</div>
          <div className="text-5xl font-bold font-mono text-purple-600">{result}</div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <CopyButton text={result} />
        </div>
      </div>
    </div>
  );
}

