import { useState } from 'react';
import { Shield, CheckCircle, XCircle, Loader, Info } from 'lucide-react';

export default function PWNEDPasswordCheck() {
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    status: 'safe' | 'compromised' | 'error';
    count?: number;
    message: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const checkPassword = async () => {
    if (!password) return;

    setChecking(true);
    setResult(null);

    try {
      // Hash the password using SHA-1
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

      // Split hash: first 5 chars for API, rest for matching
      const prefix = hashHex.slice(0, 5);
      const suffix = hashHex.slice(5);

      // Call HIBP API (k-Anonymity model - only sends first 5 chars)
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const text = await response.text();
      const hashes = text.split('\n');
      
      // Check if our hash suffix appears in the results
      let foundCount = 0;
      for (const line of hashes) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix === suffix) {
          foundCount = parseInt(count, 10);
          break;
        }
      }

      if (foundCount > 0) {
        setResult({
          status: 'compromised',
          count: foundCount,
          message: `This password has been seen ${foundCount.toLocaleString()} times in data breaches!`
        });
      } else {
        setResult({
          status: 'safe',
          message: 'Great! This password has not been found in any known data breaches.'
        });
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: `Error checking password: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            PWNED Password Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Check if your password has been exposed in data breaches
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Check Password</h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Enter Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
                  placeholder="Enter password to check..."
                  className="w-full p-4 pr-24 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              onClick={checkPassword}
              disabled={!password || checking}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {checking ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Checking...
                </>
              ) : (
                'Check Password'
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <div
              className={`px-6 py-4 ${
                result.status === 'safe'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                  : result.status === 'compromised'
                  ? 'bg-gradient-to-r from-red-500 to-pink-600'
                  : 'bg-gradient-to-r from-yellow-500 to-orange-600'
              }`}
            >
              <h2 className="text-lg font-semibold text-white">Result</h2>
            </div>
            <div className="p-6">
              <div
                className={`p-4 rounded-lg border flex items-start ${
                  result.status === 'safe'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : result.status === 'compromised'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                }`}
              >
                <div className="mr-3 mt-0.5">
                  {result.status === 'safe' ? (
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-semibold mb-2">
                    {result.message}
                  </p>
                  {result.status === 'compromised' && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Recommendation:</strong> Change this password immediately. This
                      password has been exposed in public data breaches and should never be used.
                    </p>
                  )}
                  {result.status === 'safe' && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      While this password hasn't been found in breaches, ensure it's long, unique,
                      and complex for maximum security.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 flex items-start mb-8">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              How This Works
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                • Uses the{' '}
                <a
                  href="https://haveibeenpwned.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Have I Been Pwned
                </a>{' '}
                API
              </li>
              <li>
                • Your password is hashed locally using SHA-1 before checking
              </li>
              <li>
                • Only the first 5 characters of the hash are sent (k-Anonymity model)
              </li>
              <li>• Your actual password never leaves your browser</li>
              <li>• Checks against over 10 billion compromised passwords</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Privacy & Security
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            This tool is completely private and secure. Your password is hashed in your browser
            using SHA-1, and only a small portion of the hash is sent to the API. The API returns
            potential matches, and the final check happens locally. Your password is never
            transmitted or stored.
          </p>
        </div>
      </div>
    </div>
  );
}
