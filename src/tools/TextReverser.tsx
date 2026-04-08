import { useState } from 'react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function TextReverser() {
  const [input, setInput] = useState('');

  const reverseText = () => {
    return input.split('').reverse().join('');
  };

  const flipUpsideDown = () => {
    const flipped: { [key: string]: string } = {
      'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ',
      'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u',
      'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n',
      'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
      'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁',
      'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N',
      'O': 'O', 'P': 'Ԁ', 'Q': 'Ὸ', 'R': 'ɹ', 'S': 'S', 'T': '⊥', 'U': '∩',
      'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
      '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
      '8': '8', '9': '6', '0': '0',
      '.': '˙', ',': '\'', '!': '¡', '?': '¿', '(': ')', ')': '(',
      '[': ']', ']': '[', '{': '}', '}': '{'
    };
    return input.split('').map(c => flipped[c] || c).reverse().join('');
  };

  const howItWorks = [
    { title: 'Enter Your Text', description: 'Type or paste your text into the input field' },
    { title: 'View Results', description: 'See your text reversed and flipped upside down instantly' },
    { title: 'Choose Format', description: 'Pick between the reversed or upside-down version' },
    { title: 'Copy Output', description: 'Use the copy button to save your result' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Text Reverser</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Reverse your text or flip it upside down instantly
        </p>
      </div>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="font-semibold text-gray-900 dark:text-white">Enter Your Text</h2>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full p-6 text-gray-800 dark:text-gray-200 text-lg leading-relaxed resize-none focus:outline-none min-h-[200px] dark:bg-gray-800"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Reversed Text</h2>
            {input && <CopyButton text={reverseText()} label="Copy" size="sm" />}
          </div>
          <div className="p-6 text-gray-800 dark:text-gray-200 text-lg leading-relaxed min-h-[200px] bg-gray-50 dark:bg-gray-800 break-words">
            {input ? reverseText() : 'Your reversed text will appear here...'}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Upside Down Text</h2>
            {input && <CopyButton text={flipUpsideDown()} label="Copy" size="sm" />}
          </div>
          <div className="p-6 text-gray-800 dark:text-gray-200 text-lg leading-relaxed min-h-[200px] bg-gray-50 dark:bg-gray-800 break-words">
            {input ? flipUpsideDown() : 'Your flipped text will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
