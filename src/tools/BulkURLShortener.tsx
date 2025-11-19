import { useState } from 'react';
import { Link2, Loader2 } from 'lucide-react';

interface URLResult {
  original: string;
  shortened: string;
  status: 'success' | 'error';
}

export default function BulkURLShortener() {
  const [urls, setUrls] = useState('');
  const [results, setResults] = useState<URLResult[]>([]);
  const [loading, setLoading] = useState(false);

  const shortenURLs = async () => {
    setLoading(true);
    setResults([]);

    const urlList = urls.split('\n').filter((url) => url.trim());
    const shortened: URLResult[] = [];

    for (const url of urlList) {
      // Simulated shortening (in production, use an API like bit.ly, TinyURL, etc.)
      const hash = Math.random().toString(36).substring(2, 8);
      shortened.push({
        original: url,
        shortened: `https://short.link/${hash}`,
        status: 'success',
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      setResults([...shortened]);
    }

    setLoading(false);
  };

  const copyAll = () => {
    const text = results.map((r) => r.shortened).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <Link2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bulk URL Shortener
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Shorten multiple URLs at once for campaigns and tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Original URLs</h2>
            </div>
            <div className="p-6">
              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="https://example.com/very-long-url-1&#10;https://example.com/very-long-url-2&#10;https://example.com/very-long-url-3"
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
              />
              <button
                onClick={shortenURLs}
                disabled={loading || !urls.trim()}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Shortening...
                  </>
                ) : (
                  <>
                    <Link2 className="h-5 w-5 mr-2" />
                    Shorten All URLs
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Shortened URLs ({results.length})</h2>
            </div>
            <div className="p-6">
              {results.length > 0 ? (
                <>
                  <div className="max-h-96 overflow-y-auto space-y-3 mb-4">
                    {results.map((result, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                          {result.original}
                        </div>
                        <div className="font-mono text-sm text-blue-600 dark:text-blue-400 font-semibold">
                          {result.shortened}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={copyAll}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Copy All Shortened URLs
                  </button>
                </>
              ) : (
                <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Shortened URLs will appear here...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">⚠️ Demo Mode</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This is a demonstration tool generating simulated short URLs. In production, integrate with URL shortening APIs like bit.ly, TinyURL, or custom shorteners for real functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
