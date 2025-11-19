import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generateUUIDs = () => {
    const newUUIDs = [];
    for (let i = 0; i < count; i++) {
      newUUIDs.push(crypto.randomUUID());
    }
    setUuids(newUUIDs);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">UUID Generator</h1>
        <p className="text-gray-600 text-lg">
          Generate unique identifiers (UUID v4) for your applications
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">
              Number of UUIDs: {count}
            </label>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>50</span>
          </div>
        </div>

        <button
          onClick={generateUUIDs}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Generate UUID{count > 1 ? 's' : ''}</span>
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900">
              Generated UUID{uuids.length > 1 ? 's' : ''} ({uuids.length})
            </h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy All'}</span>
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg font-mono text-sm"
                >
                  <span className="text-gray-700">{uuid}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(uuid);
                    }}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
