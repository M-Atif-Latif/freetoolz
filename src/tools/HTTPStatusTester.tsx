import { useState } from 'react';
import { Globe, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface StatusResult {
  url: string;
  status: number | null;
  statusText: string;
  redirectUrl?: string;
  responseTime: number;
  error?: string;
}

export default function HTTPStatusTester() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);

  const testURL = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setResult(null);

    const startTime = Date.now();
    
    try {
      // Use a CORS proxy for client-side testing
      const testUrl = url.startsWith('http') ? url : `https://${url}`;
      
      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'no-cors', // This will limit response details but allow the request
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // With no-cors mode, we can't access response details
      // This is a limitation of client-side HTTP testing
      setResult({
        url: testUrl,
        status: response.status || null,
        statusText: response.statusText || 'Request completed (CORS restricted)',
        responseTime,
      });
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setResult({
        url: url.startsWith('http') ? url : `https://${url}`,
        status: null,
        statusText: 'Error',
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: number | null) => {
    if (!status) return <XCircle className="h-8 w-8 text-red-500" />;
    if (status >= 200 && status < 300) return <CheckCircle className="h-8 w-8 text-green-500" />;
    if (status >= 300 && status < 400) return <AlertCircle className="h-8 w-8 text-yellow-500" />;
    return <XCircle className="h-8 w-8 text-red-500" />;
  };

  const getStatusColor = (status: number | null) => {
    if (!status) return 'from-red-500 to-pink-600';
    if (status >= 200 && status < 300) return 'from-green-500 to-emerald-600';
    if (status >= 300 && status < 400) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const statusCodes = [
    { code: '200', text: 'OK', desc: 'Request succeeded' },
    { code: '201', text: 'Created', desc: 'Resource created' },
    { code: '204', text: 'No Content', desc: 'Success, no content' },
    { code: '301', text: 'Moved Permanently', desc: 'Permanent redirect' },
    { code: '302', text: 'Found', desc: 'Temporary redirect' },
    { code: '304', text: 'Not Modified', desc: 'Cached version valid' },
    { code: '400', text: 'Bad Request', desc: 'Invalid request' },
    { code: '401', text: 'Unauthorized', desc: 'Authentication required' },
    { code: '403', text: 'Forbidden', desc: 'Access denied' },
    { code: '404', text: 'Not Found', desc: 'Resource not found' },
    { code: '500', text: 'Internal Server Error', desc: 'Server error' },
    { code: '502', text: 'Bad Gateway', desc: 'Invalid response' },
    { code: '503', text: 'Service Unavailable', desc: 'Server overloaded' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            HTTP Status Code Tester
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test any URL to check HTTP status codes and response times
          </p>
        </div>

        {/* URL Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Test URL</h2>
          </div>
          <div className="p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && testURL()}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                onClick={testURL}
                disabled={loading || !url.trim()}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <Globe className="h-5 w-5" />
                    <span>Test</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ⚠️ <strong>Note:</strong> Browser CORS restrictions may limit status code detection. For accurate testing, use server-side tools or browser extensions.
              </p>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <div className={`bg-gradient-to-r ${getStatusColor(result.status)} px-6 py-4`}>
              <h2 className="text-lg font-semibold text-white">Test Result</h2>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                {getStatusIcon(result.status)}
                <div className="ml-4">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {result.status || 'N/A'}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {result.statusText}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">URL</div>
                  <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                    {result.url}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Response Time</div>
                  <div className="font-mono text-2xl font-bold text-gray-900 dark:text-white">
                    {result.responseTime}ms
                  </div>
                </div>
              </div>

              {result.error && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm font-semibold text-red-900 dark:text-red-400">
                    Error: {result.error}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Code Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">HTTP Status Code Reference</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {statusCodes.map((status) => (
                <div
                  key={status.code}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {status.code}
                    </span>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                      {status.text}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{status.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
