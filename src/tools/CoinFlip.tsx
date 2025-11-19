import { useState } from 'react';
import { Coins, Dices } from 'lucide-react';

export default function CoinFlip() {
  const [coinResult, setCoinResult] = useState('');
  const [diceResult, setDiceResult] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [rolling, setRolling] = useState(false);

  const flipCoin = () => {
    setFlipping(true);
    setCoinResult('');
    setTimeout(() => {
      setCoinResult(Math.random() < 0.5 ? 'Heads' : 'Tails');
      setFlipping(false);
    }, 500);
  };

  const rollDice = () => {
    setRolling(true);
    setDiceResult(0);
    setTimeout(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Coin Flip & Dice Roll</h1>
      <p className="text-gray-600 text-lg mb-6">Flip a coin or roll a dice</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <Coins className={`h-20 w-20 mx-auto text-yellow-500 mb-4 ${flipping ? 'animate-spin' : ''}`} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coin Flip</h2>
          </div>

          {coinResult && (
            <div className={`p-6 rounded-xl mb-6 text-center ${
              coinResult === 'Heads' ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'
            }`}>
              <p className="text-5xl font-bold text-gray-900">{coinResult}</p>
            </div>
          )}

          <button
            onClick={flipCoin}
            disabled={flipping}
            className="w-full px-6 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300"
          >
            {flipping ? 'Flipping...' : 'Flip Coin'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <Dices className={`h-20 w-20 mx-auto text-red-500 mb-4 ${rolling ? 'animate-bounce' : ''}`} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Dice Roll</h2>
          </div>

          {diceResult > 0 && (
            <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl mb-6 text-center">
              <p className="text-6xl font-bold text-gray-900">{diceResult}</p>
            </div>
          )}

          <button
            onClick={rollDice}
            disabled={rolling}
            className="w-full px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300"
          >
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </button>
        </div>
      </div>
    </div>
  );
}
