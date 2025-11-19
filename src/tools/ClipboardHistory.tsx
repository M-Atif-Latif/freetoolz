import { useState } from 'react';
import { Clipboard, Clock, Copy } from 'lucide-react';

interface ClipboardItem {
  id: number;
  content: string;
  timestamp: Date;
}

export default function ClipboardHistory() {
  const [history, setHistory] = useState<ClipboardItem[]>([]);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState<number | null>(null);

  const addToHistory = () => {
    if (!input.trim()) return;

    const newItem: ClipboardItem = {
      id: Date.now(),
      content: input,
      timestamp: new Date(),
    };

    setHistory([newItem, ...history].slice(0, 50)); // Keep last 50 items
    setInput('');
  };

  const copyItem = (item: ClipboardItem) => {
    navigator.clipboard.writeText(item.content);
    setCopied(item.id);
    setTimeout(() => setCopied(null), 2000);
  };

  const deleteItem = (id: number) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    if (confirm('Clear all clipboard history?')) {
      setHistory([]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Clipboard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Clipboard History Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Track and manage your clipboard history with timestamps
          </p>
        </div>

        {/* Add Item */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Add to Clipboard History</h2>
          </div>
          <div className="p-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type content to save to history..."
              className="w-full h-32 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none mb-4"
            />
            <button
              onClick={addToHistory}
              disabled={!input.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              Add to History
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">
              History ({history.length} items)
            </h2>
            {history.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all"
              >
                Clear All
              </button>
            )}
          </div>
          <div className="p-6">
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No clipboard history yet. Add items above.
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(item.timestamp)}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => copyItem(item)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold transition-all flex items-center"
                        >
                          {copied === item.id ? (
                            'Copied!'
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 whitespace-pre-wrap break-words">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Features</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Stores last 50 clipboard items</li>
            <li>• Timestamps for each entry</li>
            <li>• Quick copy back to clipboard</li>
            <li>• Browser session storage (clears on refresh)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
