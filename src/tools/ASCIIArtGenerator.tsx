import { useState } from 'react';
import { Type, Sparkles } from 'lucide-react';

export default function ASCIIArtGenerator() {
  const [text, setText] = useState('HELLO');
  const [style, setStyle] = useState<'standard' | 'banner' | 'block' | 'digital'>('standard');
  const [asciiArt, setAsciiArt] = useState('');

  const fonts = {
    standard: {
      A: ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
      B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
      C: [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
      D: ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
      E: ['EEEEE', 'E    ', 'EEEE ', 'E    ', 'EEEEE'],
      F: ['FFFFF', 'F    ', 'FFFF ', 'F    ', 'F    '],
      G: [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
      H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
      I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
      J: ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
      K: ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
      L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
      M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
      N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
      O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
      P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
      Q: [' QQQ ', 'Q   Q', 'Q   Q', 'Q  QQ', ' QQQQ'],
      R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
      S: [' SSSS', 'S    ', ' SSS ', '    S', 'SSSS '],
      T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
      U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
      V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
      W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
      X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
      Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
      Z: ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '0': [' 000 ', '0  00', '0 0 0', '00  0', ' 000 '],
      '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
      '2': [' 222 ', '2   2', '   2 ', '  2  ', '22222'],
      '3': [' 333 ', '3   3', '  33 ', '3   3', ' 333 '],
      '4': ['4   4', '4   4', '44444', '    4', '    4'],
      '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
      '6': [' 666 ', '6    ', '6666 ', '6   6', ' 666 '],
      '7': ['77777', '    7', '   7 ', '  7  ', ' 7   '],
      '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
      '9': [' 999 ', '9   9', ' 9999', '    9', ' 999 '],
    },
  };

  const generate = () => {
    const chars = text.toUpperCase().split('');
    const lines: string[] = ['', '', '', '', ''];

    chars.forEach((char) => {
      const charArt = fonts.standard[char as keyof typeof fonts.standard];
      if (charArt) {
        for (let i = 0; i < 5; i++) {
          lines[i] += charArt[i] + ' ';
        }
      }
    });

    setAsciiArt(lines.join('\n'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mb-4 shadow-lg">
            <Type className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ASCII Art Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Convert text to ASCII art with multiple font styles
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Input Text</h2>
          </div>
          <div className="p-8">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text (A-Z, 0-9, spaces)"
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xl text-center font-bold mb-4"
            />

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Style (More coming soon!)
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as any)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="standard">Standard</option>
                <option value="banner" disabled>
                  Banner (Coming Soon)
                </option>
                <option value="block" disabled>
                  Block (Coming Soon)
                </option>
                <option value="digital" disabled>
                  Digital (Coming Soon)
                </option>
              </select>
            </div>

            <button
              onClick={generate}
              disabled={!text.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Generate ASCII Art
            </button>
          </div>
        </div>

        {/* Output */}
        {asciiArt && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">ASCII Art Output</h2>
            </div>
            <div className="p-8">
              <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto font-mono text-sm whitespace-pre">
                {asciiArt}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(asciiArt)}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Supports A-Z, 0-9, and spaces</li>
            <li>• Keep text under 20 characters for best results</li>
            <li>• Perfect for terminal banners, comments, and text art</li>
            <li>• Use monospace fonts for proper alignment when pasting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
