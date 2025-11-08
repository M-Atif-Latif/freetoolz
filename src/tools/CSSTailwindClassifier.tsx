import { useState } from 'react';
import { Wand2, Copy, Check } from 'lucide-react';

export default function CSSTailwindClassifier() {
  const [cssInput, setCssInput] = useState('');
  const [tailwindOutput, setTailwindOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToTailwind = () => {
    const lines = cssInput.split('\n').filter(line => line.trim());
    const conversions: string[] = [];

    const cssToTailwind: Record<string, string> = {
      // Display
      'display: block': 'block',
      'display: inline-block': 'inline-block',
      'display: inline': 'inline',
      'display: flex': 'flex',
      'display: grid': 'grid',
      'display: none': 'hidden',
      
      // Flexbox
      'flex-direction: row': 'flex-row',
      'flex-direction: column': 'flex-col',
      'justify-content: center': 'justify-center',
      'justify-content: space-between': 'justify-between',
      'justify-content: flex-start': 'justify-start',
      'justify-content: flex-end': 'justify-end',
      'align-items: center': 'items-center',
      'align-items: flex-start': 'items-start',
      'align-items: flex-end': 'items-end',
      'flex-wrap: wrap': 'flex-wrap',
      
      // Spacing
      'margin: 0': 'm-0',
      'margin: 4px': 'm-1',
      'margin: 8px': 'm-2',
      'margin: 16px': 'm-4',
      'margin: 24px': 'm-6',
      'margin: 32px': 'm-8',
      'padding: 0': 'p-0',
      'padding: 4px': 'p-1',
      'padding: 8px': 'p-2',
      'padding: 16px': 'p-4',
      'padding: 24px': 'p-6',
      'padding: 32px': 'p-8',
      
      // Typography
      'font-size: 12px': 'text-xs',
      'font-size: 14px': 'text-sm',
      'font-size: 16px': 'text-base',
      'font-size: 18px': 'text-lg',
      'font-size: 20px': 'text-xl',
      'font-size: 24px': 'text-2xl',
      'font-size: 30px': 'text-3xl',
      'font-weight: 400': 'font-normal',
      'font-weight: 500': 'font-medium',
      'font-weight: 600': 'font-semibold',
      'font-weight: 700': 'font-bold',
      'font-weight: 800': 'font-extrabold',
      'text-align: left': 'text-left',
      'text-align: center': 'text-center',
      'text-align: right': 'text-right',
      
      // Colors
      'color: white': 'text-white',
      'color: black': 'text-black',
      'color: red': 'text-red-500',
      'color: blue': 'text-blue-500',
      'color: green': 'text-green-500',
      'background-color: white': 'bg-white',
      'background-color: black': 'bg-black',
      'background-color: red': 'bg-red-500',
      'background-color: blue': 'bg-blue-500',
      'background-color: green': 'bg-green-500',
      
      // Borders
      'border: 1px solid': 'border',
      'border: 2px solid': 'border-2',
      'border: 4px solid': 'border-4',
      'border-radius: 4px': 'rounded',
      'border-radius: 8px': 'rounded-lg',
      'border-radius: 16px': 'rounded-xl',
      'border-radius: 9999px': 'rounded-full',
      
      // Sizing
      'width: 100%': 'w-full',
      'width: 50%': 'w-1/2',
      'height: 100%': 'h-full',
      'max-width: 100%': 'max-w-full',
      
      // Position
      'position: relative': 'relative',
      'position: absolute': 'absolute',
      'position: fixed': 'fixed',
      'position: sticky': 'sticky',
      
      // Opacity & Shadow
      'opacity: 0': 'opacity-0',
      'opacity: 0.5': 'opacity-50',
      'opacity: 1': 'opacity-100',
      'box-shadow: 0 1px 3px': 'shadow',
      'box-shadow: 0 4px 6px': 'shadow-md',
      'box-shadow: 0 10px 15px': 'shadow-lg',
      'box-shadow: 0 20px 25px': 'shadow-xl',
      
      // Cursor
      'cursor: pointer': 'cursor-pointer',
      'cursor: not-allowed': 'cursor-not-allowed',
      'cursor: default': 'cursor-default',
    };

    lines.forEach(line => {
      const cleaned = line.trim().replace(/;$/, '').toLowerCase();
      
      if (cssToTailwind[cleaned]) {
        conversions.push(cssToTailwind[cleaned]);
      } else {
        // Try partial matches for more complex properties
        for (const [css, tailwind] of Object.entries(cssToTailwind)) {
          if (cleaned.includes(css.split(':')[0])) {
            conversions.push(`${tailwind} /* Check: ${cleaned} */`);
            break;
          }
        }
      }
    });

    if (conversions.length === 0) {
      setTailwindOutput('<!-- No direct Tailwind conversions found. Consider using arbitrary values like [value] -->');
    } else {
      setTailwindOutput(`class="${conversions.join(' ')}"`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tailwindOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Wand2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CSS → Tailwind Classifier
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert traditional CSS properties to Tailwind CSS utility classes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">CSS Input</h2>
            </div>
            <div className="p-6">
              <textarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder="display: flex;&#10;justify-content: center;&#10;padding: 16px;&#10;font-size: 18px;&#10;color: blue;"
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                onClick={convertToTailwind}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <Wand2 className="inline h-5 w-5 mr-2" />
                Convert to Tailwind
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Tailwind Classes</h2>
              {tailwindOutput && (
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center space-x-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm overflow-auto whitespace-pre-wrap break-all">
                {tailwindOutput || 'Tailwind classes will appear here...'}
              </div>
            </div>
          </div>
        </div>

        {/* Reference Guide */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Common CSS → Tailwind Conversions</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Display</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">display: flex → flex</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">display: block → block</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Spacing</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">padding: 16px → p-4</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">margin: 8px → m-2</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Typography</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">font-size: 18px → text-lg</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">font-weight: 700 → font-bold</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Colors</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">color: blue → text-blue-500</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">background: red → bg-red-500</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Borders</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">border-radius: 8px → rounded-lg</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">border: 2px solid → border-2</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Layout</h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono">width: 100% → w-full</p>
              <p className="text-gray-600 dark:text-gray-400 font-mono">height: 50% → h-1/2</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Paste CSS properties one per line (with or without semicolons)</li>
            <li>• For custom values not in Tailwind, use arbitrary values: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">[value]</code></li>
            <li>• Combine generated classes directly in your HTML className attribute</li>
            <li>• Some complex CSS may require custom Tailwind config</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
