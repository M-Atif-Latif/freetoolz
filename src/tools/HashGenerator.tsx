import { useState } from 'react';

export default function HashGenerator() {
  const [text, setText] = useState('');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});

  const generateHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const results: { [key: string]: string } = {};

    const sha256 = await crypto.subtle.digest('SHA-256', data);
    results.SHA256 = Array.from(new Uint8Array(sha256))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const sha1 = await crypto.subtle.digest('SHA-1', data);
    results.SHA1 = Array.from(new Uint8Array(sha1))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    setHashes(results);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Hash Generator</h1>
      <p className="text-gray-600 text-lg mb-6">Generate SHA-1 and SHA-256 hashes</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-6"
          rows={4}
        />
        <button
          onClick={generateHashes}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-6"
        >
          Generate Hashes
        </button>
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm font-medium text-gray-700 mb-2">{algo}</div>
                <div className="font-mono text-sm text-gray-900 break-all">{hash}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
