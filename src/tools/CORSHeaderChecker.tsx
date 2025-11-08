import { useState } from 'react';
import { Shield, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface CORSResult {
  url: string;
  hasAccessControlAllowOrigin: boolean;
  allowOrigin?: string;
  allowMethods?: string;
  allowHeaders?: string;
  allowCredentials?: string;
  exposeHeaders?: string;
  maxAge?: string;
  error?: string;
}

export default function CORSHeaderChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CORSResult | null>(null);

  const checkCORS = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      
      const response = await fetch(testUrl, {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
        },
      });

      const allowOrigin = response.headers.get('Access-Control-Allow-Origin');
      const allowMethods = response.headers.get('Access-Control-Allow-Methods');
      const allowHeaders = response.headers.get('Access-Control-Allow-Headers');
      const allowCredentials = response.headers.get('Access-Control-Allow-Credentials');
      const exposeHeaders = response.headers.get('Access-Control-Expose-Headers');
      const maxAge = response.headers.get('Access-Control-Max-Age');

      setResult({
        url: testUrl,
        hasAccessControlAllowOrigin: !!allowOrigin,
        allowOrigin: allowOrigin || undefined,
        allowMethods: allowMethods || undefined,
        allowHeaders: allowHeaders || undefined,
        allowCredentials: allowCredentials || undefined,
        exposeHeaders: exposeHeaders || undefined,
        maxAge: maxAge || undefined,
      });
    } catch (error) {
      setResult({
        url: url.startsWith('http') ? url : `https://${url}`,
        hasAccessControlAllowOrigin: false,
        error: error instanceof Error ? error.message : 'CORS check failed - the server may not support CORS or is blocking requests',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CORS Header Checker
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check Cross-Origin Resource Sharing (CORS) headers for any URL
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Test URL for CORS</h2>
          </div>
          <div className="p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && checkCORS()}
                placeholder="https://api.example.com/endpoint"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={checkCORS}
                disabled={loading || !url.trim()}
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Check CORS</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                💡 <strong>Tip:</strong> This tool sends an OPTIONS preflight request to check CORS headers. Some servers may block these requests.
              </p>
            </div>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className={`bg-gradient-to-r ${result.hasAccessControlAllowOrigin ? 'from-green-500 to-emerald-600' : 'from-red-500 to-pink-600'} px-6 py-4`}>
                <h2 className="text-lg font-semibold text-white">CORS Status</h2>
              </div>
              <div className="p-8 text-center">
                {result.hasAccessControlAllowOrigin ? (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      CORS Enabled ✓
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This endpoint has CORS headers configured
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      CORS Not Detected
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      No CORS headers found or request blocked
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Headers Details */}
            {!result.error && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">CORS Headers</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          Access-Control-Allow-Origin
                        </div>
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {result.allowOrigin || 'Not set'}
                        </div>
                      </div>
                      {result.allowOrigin ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 ml-2" />
                      )}
                    </div>

                    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          Access-Control-Allow-Methods
                        </div>
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {result.allowMethods || 'Not set'}
                        </div>
                      </div>
                      {result.allowMethods ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 ml-2" />
                      )}
                    </div>

                    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          Access-Control-Allow-Headers
                        </div>
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {result.allowHeaders || 'Not set'}
                        </div>
                      </div>
                      {result.allowHeaders ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 ml-2" />
                      )}
                    </div>

                    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          Access-Control-Allow-Credentials
                        </div>
                        <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {result.allowCredentials || 'Not set'}
                        </div>
                      </div>
                      {result.allowCredentials ? (
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400 ml-2" />
                      )}
                    </div>

                    {result.exposeHeaders && (
                      <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            Access-Control-Expose-Headers
                          </div>
                          <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            {result.exposeHeaders}
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      </div>
                    )}

                    {result.maxAge && (
                      <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            Access-Control-Max-Age
                          </div>
                          <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            {result.maxAge} seconds
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {result.error && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-400 mb-2">Error</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{result.error}</p>
              </div>
            )}
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About CORS</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• <strong>CORS</strong> allows servers to specify who can access their resources</li>
            <li>• Required for browser-based apps making cross-origin requests</li>
            <li>• <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Access-Control-Allow-Origin: *</code> allows all origins</li>
            <li>• Use specific origins for better security in production</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
