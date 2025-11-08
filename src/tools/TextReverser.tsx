import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function TextReverser() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState('');

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Text Reverser</h1>
        <p className="text-gray-600 text-lg">
          Reverse your text or flip it upside down instantly
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Enter Your Text</h2>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full p-6 text-gray-800 text-lg leading-relaxed resize-none focus:outline-none min-h-[200px]"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Reversed Text</h2>
            {input && (
              <button
                onClick={() => copyToClipboard(reverseText(), 'reversed')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {copied === 'reversed' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'reversed' ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <div className="p-6 text-gray-800 text-lg leading-relaxed min-h-[200px] bg-gray-50">
            {input ? reverseText() : 'Your reversed text will appear here...'}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">Upside Down Text</h2>
            {input && (
              <button
                onClick={() => copyToClipboard(flipUpsideDown(), 'flipped')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {copied === 'flipped' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied === 'flipped' ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <div className="p-6 text-gray-800 text-lg leading-relaxed min-h-[200px] bg-gray-50">
            {input ? flipUpsideDown() : 'Your flipped text will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
