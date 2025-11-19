import { useState } from 'react';
import { EyeOff, Copy, Check, Info } from 'lucide-react';

export default function InvisibleCharacter() {
  const [copied, setCopied] = useState('');
  const [count, setCount] = useState(1);

  const invisibleCharacters = [
    {
      name: 'Zero Width Space',
      code: '\u200B',
      unicode: 'U+200B',
      description: 'Most common invisible character, used to create line breaks without visible space',
      hex: '&zwsp;'
    },
    {
      name: 'Zero Width Non-Joiner',
      code: '\u200C',
      unicode: 'U+200C',
      description: 'Prevents characters from joining together in cursive scripts',
      hex: '&zwnj;'
    },
    {
      name: 'Zero Width Joiner',
      code: '\u200D',
      unicode: 'U+200D',
      description: 'Makes characters join together, used in emojis and ligatures',
      hex: '&zwj;'
    },
    {
      name: 'Empty/Blank Character',
      code: '\u2800',
      unicode: 'U+2800',
      description: 'Braille pattern blank, appears completely invisible',
      hex: '&#10240;'
    },
    {
      name: 'Invisible Separator',
      code: '\u2063',
      unicode: 'U+2063',
      description: 'Mathematical invisible separator',
      hex: '&#8291;'
    },
    {
      name: 'Invisible Times',
      code: '\u2062',
      unicode: 'U+2062',
      description: 'Invisible multiplication sign',
      hex: '&#8290;'
    }
  ];

  const copyCharacter = (char: string, name: string) => {
    const text = char.repeat(count);
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <EyeOff className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Invisible Character Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate and copy invisible Unicode characters for various purposes. Perfect for Discord, WhatsApp, or any text field.
          </p>
        </div>

        {/* Count Selector */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Number of Characters to Copy
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-2xl font-bold text-gray-900 dark:text-white min-w-[4rem] text-center">
              {count}
            </span>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {invisibleCharacters.map((char) => (
            <div
              key={char.unicode}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4">
                <h3 className="text-lg font-bold text-white">{char.name}</h3>
                <p className="text-sm text-blue-100 font-mono">{char.unicode}</p>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {char.description}
                </p>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">HTML Entity:</p>
                  <code className="text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                    {char.hex}
                  </code>
                </div>
                <button
                  onClick={() => copyCharacter(char.code, char.name)}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                    copied === char.name
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied === char.name ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Copied {count}x!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5" />
                      <span>Copy {count > 1 ? `${count}x` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Use Cases */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Common Use Cases
              </h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• <strong>Discord:</strong> Create invisible nicknames or empty messages</li>
              <li>• <strong>WhatsApp:</strong> Send blank messages or create space</li>
              <li>• <strong>Social Media:</strong> Create line breaks in bios</li>
              <li>• <strong>Gaming:</strong> Create invisible or special names</li>
              <li>• <strong>Forms:</strong> Fill required fields invisibly</li>
              <li>• <strong>Testing:</strong> Test form validation and character limits</li>
            </ul>
          </div>

          {/* How to Use */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                How to Use
              </h3>
            </div>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300 text-sm list-decimal list-inside">
              <li>Choose how many characters you want (1-100)</li>
              <li>Click the "Copy" button on your preferred character</li>
              <li>Paste (Ctrl+V / Cmd+V) wherever you need it</li>
              <li>The character is invisible but takes up space</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-300 dark:border-yellow-700">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Some platforms may filter or remove certain invisible characters for security reasons.
              </p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
            <span>⚠️</span>
            <span>Important Notes</span>
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Invisible characters may cause issues in some systems or databases</li>
            <li>• Use responsibly - don't abuse on platforms where it's against ToS</li>
            <li>• Some text editors may show these characters with special symbols</li>
            <li>• Character support varies by font and platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
