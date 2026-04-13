import { useState } from 'react';
import { Dices, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function DiceRoller() {
  const howItWorks = [
    { title: 'Set Number of Dice', description: 'Choose how many dice to roll (1-10)' },
    { title: 'Choose Dice Type', description: 'Select between d6, d12, d20, or other types' },
    { title: 'Click Roll', description: 'Press the roll button to generate random numbers' },
    { title: 'View Results', description: 'See individual rolls and total sum instantly' }
  ];

  const [numDice, setNumDice] = useState('1');
  const [diceType, setDiceType] = useState('d6');
  const [rolls, setRolls] = useState<number[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const diceTypesMap: Record<string, number> = {
    'd4': 4,
    'd6': 6,
    'd8': 8,
    'd10': 10,
    'd12': 12,
    'd20': 20,
    'd100': 100,
  };

  const rollDice = () => {
    const sides = diceTypesMap[diceType];
    const num = parseInt(numDice) || 1;
    const newRolls: number[] = [];

    for (let i = 0; i < num; i++) {
      newRolls.push(Math.floor(Math.random() * sides) + 1);
    }

    setRolls(newRolls);
    setHistory([...history, ...newRolls].slice(-20));
  };

  const total = rolls.reduce((a, b) => a + b, 0);
  const average = rolls.length > 0 ? (total / rolls.length).toFixed(2) : '0.00';

  const reset = () => {
    setRolls([]);
    setHistory([]);
    setNumDice('1');
    setDiceType('d6');
  };

  const resultText = rolls.length > 0 ? `Rolls: ${rolls.join(', ')} | Total: ${total}` : 'No rolls yet';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Dice Roller</h1>
      <p className="text-gray-600 text-lg mb-8">Roll virtual dice for games and random selections</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dice</label>
            <select
              value={numDice}
              onChange={(e) => setNumDice(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n} dice
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dice Type</label>
            <select
              value={diceType}
              onChange={(e) => setDiceType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
            >
              <option value="d4">4-sided (d4)</option>
              <option value="d6">6-sided (d6)</option>
              <option value="d8">8-sided (d8)</option>
              <option value="d10">10-sided (d10)</option>
              <option value="d12">12-sided (d12)</option>
              <option value="d20">20-sided (d20)</option>
              <option value="d100">100-sided (d100)</option>
            </select>
          </div>
        </div>

        <button
          onClick={rollDice}
          className="w-full mb-8 px-6 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold text-lg flex items-center justify-center gap-2 shadow-lg"
        >
          <Dices className="h-6 w-6" /> Roll Dice
        </button>

        {rolls.length > 0 && (
          <>
            <div className="mb-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600 mb-2">Individual Rolls</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {rolls.map((roll, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-white border-2 border-purple-300 rounded-lg flex items-center justify-center font-bold text-lg text-purple-600 shadow-md"
                    >
                      {roll}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-white rounded-lg border border-primary-200">
                  <div className="text-xs text-gray-600">Total</div>
                  <div className="text-3xl font-bold text-primary-600">{total}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="text-xs text-gray-600">Average</div>
                  <div className="text-3xl font-bold text-green-600">{average}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                  <div className="text-xs text-gray-600">Count</div>
                  <div className="text-3xl font-bold text-orange-600">{rolls.length}</div>
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">Recent Rolls (Last 20)</div>
                <div className="text-sm font-mono text-gray-600 break-words">{history.join(', ')}</div>
              </div>
            )}
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <CopyButton text={resultText} />
        </div>
      </div>
    </div>
  );
}

