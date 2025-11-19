import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime(t => t + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3 text-center">Stopwatch</h1>
      <p className="text-gray-600 text-lg mb-8 text-center">Accurate time measurement</p>

      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-12">
        <div className="text-center mb-8">
          <div className="text-7xl md:text-8xl font-mono font-bold text-white mb-2">{formatTime(time)}</div>
          <div className="text-blue-200 text-sm font-medium">MM:SS.MS</div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center space-x-2 ${
              isRunning
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            <span>{isRunning ? 'Pause' : 'Start'}</span>
          </button>

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
