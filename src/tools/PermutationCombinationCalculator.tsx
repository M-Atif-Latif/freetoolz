import { useState } from 'react';
import { Calculator, Shuffle } from 'lucide-react';

export default function PermutationCombinationCalculator() {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [permutation, setPermutation] = useState('');
  const [combination, setCombination] = useState('');
  const [permutationRepetition, setPermutationRepetition] = useState('');

  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = () => {
    const nNum = parseInt(n);
    const rNum = parseInt(r);

    if (isNaN(nNum) || isNaN(rNum) || nNum < 0 || rNum < 0) {
      setPermutation('Invalid input');
      setCombination('Invalid input');
      setPermutationRepetition('Invalid input');
      return;
    }

    if (rNum > nNum) {
      setPermutation('r cannot be greater than n');
      setCombination('r cannot be greater than n');
      setPermutationRepetition('N/A');
      return;
    }

    // Permutation: P(n,r) = n! / (n-r)!
    const perm = factorial(nNum) / factorial(nNum - rNum);
    setPermutation(perm.toLocaleString());

    // Combination: C(n,r) = n! / (r! * (n-r)!)
    const comb = factorial(nNum) / (factorial(rNum) * factorial(nNum - rNum));
    setCombination(comb.toLocaleString());

    // Permutation with Repetition: n^r
    const permRep = Math.pow(nNum, rNum);
    setPermutationRepetition(permRep.toLocaleString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Permutation & Combination Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Calculate permutations, combinations, and arrangements
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Enter Values</h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  n (Total items)
                </label>
                <input
                  type="number"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  r (Items to choose)
                </label>
                <input
                  type="number"
                  value={r}
                  onChange={(e) => setR(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Shuffle className="h-5 w-5 mr-2" />
              Calculate
            </button>
          </div>
        </div>

        {/* Results */}
        {permutation && permutation !== 'Invalid input' && permutation !== 'r cannot be greater than n' && (
          <div className="space-y-6">
            {/* Permutation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Permutation P(n,r)</h2>
              </div>
              <div className="p-8">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {permutation}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Order matters, no repetition
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-mono">
                    P({n},{r}) = {n}! / ({n}-{r})!
                  </p>
                </div>
              </div>
            </div>

            {/* Combination */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Combination C(n,r)</h2>
              </div>
              <div className="p-8">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {combination}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Order doesn't matter, no repetition
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-mono">
                    C({n},{r}) = {n}! / ({r}! × ({n}-{r})!)
                  </p>
                </div>
              </div>
            </div>

            {/* Permutation with Repetition */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Permutation with Repetition</h2>
              </div>
              <div className="p-8">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {permutationRepetition}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Order matters, repetition allowed
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-gray-700 dark:text-gray-300 text-center font-mono">
                    P'({n},{r}) = {n}^{r}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {(permutation === 'Invalid input' || permutation === 'r cannot be greater than n') && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
            <p className="text-red-900 dark:text-red-400 text-center font-semibold">{permutation}</p>
          </div>
        )}

        {/* Examples */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Examples & Use Cases</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Permutation Example:</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  How many ways can 3 people be arranged in 3 chairs? <strong>P(3,3) = 6</strong>
                  <br />
                  <span className="text-xs text-gray-600 dark:text-gray-400">(Order matters: ABC, ACB, BAC, BCA, CAB, CBA)</span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Combination Example:</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  How many ways can you choose 2 toppings from 5 options? <strong>C(5,2) = 10</strong>
                  <br />
                  <span className="text-xs text-gray-600 dark:text-gray-400">(Order doesn't matter: AB = BA)</span>
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Permutation with Repetition:</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  How many 4-digit PIN codes can be made with 10 digits? <strong>P'(10,4) = 10,000</strong>
                  <br />
                  <span className="text-xs text-gray-600 dark:text-gray-400">(Digits can repeat: 0000, 1111, 1234, etc.)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
