import { useState } from 'react';
import { Hash, Search } from 'lucide-react';

export default function HashIdentifier() {
  const [hash, setHash] = useState('');
  const [results, setResults] = useState<{ type: string; confidence: string; info: string }[]>([]);

  const identifyHash = () => {
    if (!hash.trim()) return;

    const cleanHash = hash.trim().toLowerCase();
    const length = cleanHash.length;
    const detected: { type: string; confidence: string; info: string }[] = [];

    // Check if valid hex
    const isHex = /^[a-f0-9]+$/i.test(cleanHash);

    if (!isHex) {
      detected.push({
        type: 'Invalid',
        confidence: 'N/A',
        info: 'Not a valid hexadecimal hash',
      });
      setResults(detected);
      return;
    }

    // Identify by length
    switch (length) {
      case 32:
        detected.push({
          type: 'MD5',
          confidence: 'High',
          info: '128-bit hash, commonly used but cryptographically broken',
        });
        detected.push({
          type: 'NTLM',
          confidence: 'Medium',
          info: 'Windows password hash (also 128-bit)',
        });
        break;

      case 40:
        detected.push({
          type: 'SHA-1',
          confidence: 'High',
          info: '160-bit hash, deprecated for security',
        });
        detected.push({
          type: 'RIPEMD-160',
          confidence: 'Low',
          info: '160-bit hash, rarely used',
        });
        break;

      case 56:
        detected.push({
          type: 'SHA-224',
          confidence: 'High',
          info: '224-bit hash, truncated SHA-256',
        });
        break;

      case 64:
        detected.push({
          type: 'SHA-256',
          confidence: 'High',
          info: '256-bit hash, widely used and secure',
        });
        detected.push({
          type: 'SHA3-256',
          confidence: 'Medium',
          info: 'Keccak-based 256-bit hash',
        });
        detected.push({
          type: 'BLAKE2b-256',
          confidence: 'Low',
          info: 'Fast cryptographic hash',
        });
        break;

      case 96:
        detected.push({
          type: 'SHA-384',
          confidence: 'High',
          info: '384-bit hash, truncated SHA-512',
        });
        detected.push({
          type: 'SHA3-384',
          confidence: 'Medium',
          info: 'Keccak-based 384-bit hash',
        });
        break;

      case 128:
        detected.push({
          type: 'SHA-512',
          confidence: 'High',
          info: '512-bit hash, very secure',
        });
        detected.push({
          type: 'SHA3-512',
          confidence: 'Medium',
          info: 'Keccak-based 512-bit hash',
        });
        detected.push({
          type: 'BLAKE2b-512',
          confidence: 'Low',
          info: 'Fast 512-bit cryptographic hash',
        });
        detected.push({
          type: 'Whirlpool',
          confidence: 'Low',
          info: '512-bit hash, rarely used',
        });
        break;

      case 16:
        detected.push({
          type: 'MD5 (half)',
          confidence: 'Low',
          info: 'Truncated MD5 or CRC-64',
        });
        break;

      case 8:
        detected.push({
          type: 'CRC-32',
          confidence: 'Medium',
          info: '32-bit checksum, not cryptographic',
        });
        break;

      default:
        detected.push({
          type: 'Unknown',
          confidence: 'N/A',
          info: `${length} characters - uncommon hash length`,
        });
    }

    // Check for specific patterns
    if (cleanHash.startsWith('$') || cleanHash.includes('$')) {
      detected.unshift({
        type: 'Password Hash (salted)',
        confidence: 'High',
        info: 'Contains salt separator ($), likely bcrypt/scrypt/PBKDF2',
      });
    }

    setResults(detected);
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'Low':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Hash className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hash Type Identifier
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Identify hash types (MD5, SHA-1, SHA-256, SHA-512, etc.)
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Enter Hash</h2>
          </div>
          <div className="p-6">
            <textarea
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="5d41402abc4b2a76b9719d911017c592&#10;or&#10;aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d"
              className="w-full h-32 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
            />
            <button
              onClick={identifyHash}
              disabled={!hash.trim()}
              className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Search className="h-5 w-5 mr-2" />
              Identify Hash Type
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Possible Hash Types ({results.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {result.type}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(
                          result.confidence
                        )}`}
                      >
                        {result.confidence} Confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{result.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hash Length Reference */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Common Hash Lengths</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">32 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">MD5, NTLM</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">40 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">SHA-1</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">56 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">SHA-224</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">64 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">SHA-256, SHA3-256</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">96 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">SHA-384, SHA3-384</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-bold text-gray-900 dark:text-white">128 chars:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">SHA-512, SHA3-512</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">⚠️ Important</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• This tool identifies hash <strong>types</strong>, it does NOT crack hashes</li>
            <li>• Multiple hash algorithms can produce the same length output</li>
            <li>• Modern secure hashing uses SHA-256 or higher</li>
            <li>• MD5 and SHA-1 are deprecated for security purposes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
