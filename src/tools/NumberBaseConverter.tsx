import { useState } from 'react';
import { Hash, ArrowRight, Copy, Check } from 'lucide-react';

export default function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState(10);
  const [outputBase, setOutputBase] = useState(16);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const bases = [
    { value: 2, name: 'Binary' },
    { value: 8, name: 'Octal' },
    { value: 10, name: 'Decimal' },
    { value: 16, name: 'Hexadecimal' },
    { value: 32, name: 'Base32' },
    { value: 36, name: 'Base36' },
  ];

  const convert = () => {
    try {
      setError('');
      if (!inputValue.trim()) {
        setError('Please enter a number to convert');
        setResult('');
        return;
      }

      // Parse input based on input base
      const decimalValue = parseInt(inputValue.trim(), inputBase);
      
      if (isNaN(decimalValue)) {
        setError(`Invalid number for base ${inputBase}`);
        setResult('');
        return;
      }

      // Convert to output base
      const convertedValue = decimalValue.toString(outputBase).toUpperCase();
      setResult(convertedValue);
    } catch (err) {
      setError('Conversion failed. Please check your input.');
      setResult('');
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const swapBases = () => {
    const temp = inputBase;
    setInputBase(outputBase);
    setOutputBase(temp);
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Number Base Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert numbers between different bases (2-36). Binary, Octal, Decimal, Hexadecimal, and more.
          </p>
        </div>

        {/* Converter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            {/* Input Base Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                From Base
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {bases.map((base) => (
                  <button
                    key={base.value}
                    onClick={() => {
                      setInputBase(base.value);
                      setResult('');
                      setError('');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      inputBase === base.value
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {base.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Input Number
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter number in base ${inputBase}`}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none text-lg font-mono"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={swapBases}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                title="Swap bases"
              >
                <ArrowRight className="h-6 w-6 rotate-90" />
              </button>
            </div>

            {/* Output Base Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                To Base
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {bases.map((base) => (
                  <button
                    key={base.value}
                    onClick={() => {
                      setOutputBase(base.value);
                      setResult('');
                      setError('');
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      outputBase === base.value
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {base.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Convert Button */}
            <button
              onClick={convert}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Convert Number
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-700 dark:text-red-400 text-center font-medium">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Result</h3>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white font-mono break-all">
                  {result}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Supported Number Bases
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>• <strong>Binary (Base 2):</strong> Uses digits 0-1</li>
            <li>• <strong>Octal (Base 8):</strong> Uses digits 0-7</li>
            <li>• <strong>Decimal (Base 10):</strong> Uses digits 0-9 (standard)</li>
            <li>• <strong>Hexadecimal (Base 16):</strong> Uses digits 0-9 and A-F</li>
            <li>• <strong>Base32 (Base 32):</strong> Uses digits 0-9 and A-V</li>
            <li>• <strong>Base36 (Base 36):</strong> Uses digits 0-9 and A-Z</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
