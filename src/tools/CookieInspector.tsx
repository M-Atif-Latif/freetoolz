import { useState } from 'react';
import { Cookie, Info } from 'lucide-react';

interface CookieInfo {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string;
}

export default function CookieInspector() {
  const [cookies, setCookies] = useState<CookieInfo[]>([]);

  const loadCookies = () => {
    const cookieStr = document.cookie;
    if (!cookieStr) {
      setCookies([]);
      return;
    }

    const parsed: CookieInfo[] = cookieStr.split(';').map((cookie) => {
      const [name, value] = cookie.trim().split('=');
      return {
        name: name || '',
        value: value || '',
        domain: window.location.hostname,
        path: '/',
      };
    });

    setCookies(parsed);
  };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    loadCookies();
  };

  const clearAll = () => {
    cookies.forEach((cookie) => {
      document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    loadCookies();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
            <Cookie className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Inspector
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            View and manage browser cookies for the current domain
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">
              Current Cookies ({cookies.length})
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={loadCookies}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm font-semibold"
              >
                Refresh
              </button>
              {cookies.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all text-sm font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          <div className="p-6">
            {cookies.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No cookies found for this domain. Click Refresh to load cookies.
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {cookies.map((cookie, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white mb-1">
                          {cookie.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 break-all">
                          {cookie.value}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCookie(cookie.name)}
                        className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <div>
                        <span className="font-semibold">Domain:</span> {cookie.domain}
                      </div>
                      <div>
                        <span className="font-semibold">Path:</span> {cookie.path}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 flex items-start">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">About Cookies</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Cookies are small pieces of data stored by your browser</li>
              <li>• This tool only shows cookies accessible to JavaScript (not HttpOnly cookies)</li>
              <li>• Secure cookies are only sent over HTTPS connections</li>
              <li>• Deleting cookies may log you out of websites</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
