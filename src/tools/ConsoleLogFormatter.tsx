import { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export default function ConsoleLogFormatter() {
  const [input, setInput] = useState('');
  const [formatted, setFormatted] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
    } catch {
      // If not JSON, try to format as JavaScript console output
      const lines = input.split('\n');
      const formatted = lines
        .map((line) => {
          // Format console.log statements
          if (line.includes('console.log')) {
            return line.replace(/console\.log\((.*)\)/, (_, content) => {
              try {
                return `console.log(${JSON.stringify(JSON.parse(content), null, 2)})`;
              } catch {
                return line;
              }
            });
          }
          return line;
        })
        .join('\n');

      setFormatted(formatted || input);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-zinc-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-500 to-zinc-600 rounded-2xl mb-4 shadow-lg">
            <Terminal className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Console Log Formatter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Format and beautify console.log output and JavaScript objects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-500 to-zinc-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Unformatted Input</h2>
            </div>
            <div className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name":"John","age":30,"skills":["React","Node.js"]}&#10;or&#10;console.log({data:"test"})'
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
              <button
                onClick={format}
                disabled={!input.trim()}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-slate-500 to-zinc-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Format
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Formatted Output</h2>
              {formatted && (
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
              <pre className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-900 text-green-400 font-mono text-sm overflow-auto whitespace-pre">
                {formatted || 'Formatted output will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Example Inputs</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-4">
            <button
              onClick={() =>
                setInput('{"user":{"name":"Alice","email":"alice@example.com","age":25}}')
              }
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              <div className="font-bold text-gray-900 dark:text-white mb-2">Minified JSON</div>
              <code className="text-xs text-gray-600 dark:text-gray-400">
                &#123;"user":&#123;"name":"Alice",...&#125;&#125;
              </code>
            </button>

            <button
              onClick={() =>
                setInput(
                  'console.log({"type":"error","message":"Something went wrong","code":500})'
                )
              }
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
            >
              <div className="font-bold text-gray-900 dark:text-white mb-2">Console.log</div>
              <code className="text-xs text-gray-600 dark:text-gray-400">
                console.log(&#123;"type":"error"...&#125;)
              </code>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Tips</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Paste minified JSON objects for instant formatting</li>
            <li>• Works with console.log statements from browser DevTools</li>
            <li>• Useful for debugging and making logs readable</li>
            <li>• Supports nested objects and arrays</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
