import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

export default function Timer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const start = () => {
    const total = minutes * 60 + seconds;
    if (total > 0) {
      setTimeLeft(total);
      setIsRunning(true);
      setIsFinished(false);
    }
  };

  const reset = () => {
    setTimeLeft(minutes * 60 + seconds);
    setIsRunning(false);
    setIsFinished(false);
  };

  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">Timer</h1>
      <p className="text-gray-600 text-lg mb-8 text-center">Countdown timer</p>

      <div className={`rounded-2xl shadow-2xl p-12 transition-all ${
        isFinished ? 'bg-gradient-to-br from-red-500 to-red-700 animate-pulse' : 'bg-gradient-to-br from-purple-500 to-purple-700'
      }`}>
        {!isRunning && !isFinished && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-3 rounded-lg text-center text-2xl font-bold"
                min="0"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-lg text-center text-2xl font-bold"
                min="0"
                max="59"
              />
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="text-7xl md:text-8xl font-mono font-bold text-white mb-2">
            {displayMinutes.toString().padStart(2, '0')}:{displaySeconds.toString().padStart(2, '0')}
          </div>
          {isFinished && (
            <div className="flex items-center justify-center space-x-2 text-white text-xl">
              <Bell className="h-6 w-6 animate-bounce" />
              <span>Time's Up!</span>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button
              onClick={start}
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-semibold text-lg shadow-lg flex items-center space-x-2"
            >
              <Play className="h-6 w-6" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={() => setIsRunning(false)}
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all font-semibold text-lg shadow-lg flex items-center space-x-2"
            >
              <Pause className="h-6 w-6" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={reset}
            className="px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg flex items-center space-x-2"
          >
            <RotateCcw className="h-6 w-6" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
