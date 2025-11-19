import { useState } from 'react';
import { Radio } from 'lucide-react';
import ToolNavigation from '../components/ToolNavigation';

const morseCodeMap: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

export default function MorseCodeConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const textToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => morseCodeMap[char] || char)
      .join(' ');
  };

  const morseToText = (morse: string): string => {
    const reverseMorseMap: { [key: string]: string } = {};
    Object.keys(morseCodeMap).forEach(key => {
      reverseMorseMap[morseCodeMap[key]] = key;
    });

    return morse
      .split(' ')
      .map(code => reverseMorseMap[code] || code)
      .join('');
  };

  const output = mode === 'encode' ? textToMorse(input) : morseToText(input);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const playMorse = () => {
    if (!output || mode === 'decode') return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 100; // milliseconds
    let currentTime = audioContext.currentTime;

    output.split('').forEach(char => {
      if (char === '.') {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration / 1000);
        currentTime += dotDuration / 1000 + 0.05;
      } else if (char === '-') {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + (dotDuration * 3) / 1000);
        currentTime += (dotDuration * 3) / 1000 + 0.05;
      } else if (char === ' ') {
        currentTime += dotDuration / 1000;
      } else if (char === '/') {
        currentTime += (dotDuration * 3) / 1000;
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-gray-100 dark:border-gray-700 p-8">
        <ToolNavigation />
        
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
            <Radio className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Morse Code Converter</h1>
            <p className="text-gray-600 dark:text-gray-400">Convert text to Morse code and back</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setMode('encode')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'encode'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Text to Morse
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                mode === 'decode'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Morse to Text
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Input Text' : 'Input Morse Code'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to convert...' : 'Enter Morse code (space-separated)...'}
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {mode === 'encode' ? 'Morse Code Output' : 'Text Output'}
              </label>
              <div className="flex gap-2">
                {mode === 'encode' && output && (
                  <button
                    onClick={playMorse}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Play Sound
                  </button>
                )}
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="text-sm bg-emerald-600 text-white px-3 py-1 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Copy
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono resize-none text-2xl"
            />
          </div>
        </div>

        <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📡 Morse Code Reference:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm font-mono">
            {Object.entries(morseCodeMap).slice(0, 26).map(([letter, code]) => (
              <div key={letter} className="text-gray-700 dark:text-gray-300">
                <span className="font-bold">{letter}</span> = {code}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 About Morse Code:</h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Developed in the 1830s by Samuel Morse</li>
            <li>Uses dots (.) and dashes (-) to represent letters</li>
            <li>Still used in aviation, amateur radio, and emergencies</li>
            <li>SOS in Morse: ... --- ...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
