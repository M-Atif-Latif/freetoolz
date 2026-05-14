import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

const romanNumerals: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

export default function RomanNumeralConverter() {
  const howItWorks = [
    { title: 'Enter Number', description: 'Type a number (1-3999) or Roman numeral' },
    { title: 'Convert', description: 'Instantly convert between formats' },
    { title: 'View Result', description: 'See your converted Roman numeral or Arabic number' },
    { title: 'Copy Result', description: 'Save your conversion' }
  ];
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'toRoman' | 'fromRoman'>('toRoman');

  const numberToRoman = (num: number): string => {
    if (num < 1 || num > 3999) return 'Number must be between 1 and 3999';
    
    let result = '';
    let remaining = num;

    for (const [value, numeral] of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  };

  const romanToNumber = (roman: string): string => {
    const romanMap: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };

    roman = roman.toUpperCase();
    let result = 0;

    for (let i = 0; i < roman.length; i++) {
      const current = romanMap[roman[i]];
      const next = romanMap[roman[i + 1]];

      if (!current) return 'Invalid Roman numeral';

      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }

    return result.toString();
  };

  const getOutput = () => {
    if (!input) return '';
    
    if (mode === 'toRoman') {
      const num = parseInt(input);
      if (isNaN(num)) return 'Invalid number';
      return numberToRoman(num);
    } else {
      return romanToNumber(input);
    }
  };

  const output = getOutput();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Roman Numeral Converter</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">Convert between numbers and Roman numerals</p>

      <HowItWorks steps={howItWorks} />

      <div className="mb-6">
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 inline-flex">
          <button
            onClick={() => setMode('toRoman')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'toRoman'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Number to Roman
          </button>
          <button
            onClick={() => setMode('fromRoman')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              mode === 'fromRoman'
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Roman to Number
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'toRoman' ? 'e.g., 2024' : 'e.g., MMXXIV'}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
          />
        </div>

        {output && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 border-2 border-primary-200 dark:border-primary-800">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Result</h2>
              <CopyButton text={output} label="Copy" size="md" />
            </div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-secondary-500">
              {output}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border-2 border-primary-200 dark:border-primary-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🏛️ Roman Numeral Rules:</h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            <div><span className="font-bold">I</span> = 1</div>
            <div><span className="font-bold">V</span> = 5</div>
            <div><span className="font-bold">X</span> = 10</div>
            <div><span className="font-bold">L</span> = 50</div>
            <div><span className="font-bold">C</span> = 100</div>
            <div><span className="font-bold">D</span> = 500</div>
            <div><span className="font-bold">M</span> = 1000</div>
          </div>
          <ul className="list-disc list-inside space-y-1">
            <li>Symbols are usually written from largest to smallest (left to right)</li>
            <li>When a smaller value appears before a larger value, subtract it</li>
            <li>Examples: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900</li>
            <li>The same symbol cannot be used more than three times in succession</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { num: 1, roman: 'I' },
          { num: 4, roman: 'IV' },
          { num: 10, roman: 'X' },
          { num: 50, roman: 'L' },
          { num: 100, roman: 'C' },
          { num: 500, roman: 'D' },
          { num: 1000, roman: 'M' },
          { num: 2024, roman: 'MMXXIV' }
        ].map(({ num, roman }) => (
          <button
            key={num}
            onClick={() => {
              setInput(mode === 'toRoman' ? num.toString() : roman);
            }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
          >
            <div className="text-lg font-bold text-gray-900 dark:text-white">{num}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{roman}</div>
          </button>
        ))}
      </div>
    </div>
  );
}


