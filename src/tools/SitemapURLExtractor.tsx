import { useState } from 'react';
import { Map, Download, Info } from 'lucide-react';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

export default function SitemapURLExtractor() {
  const [sitemapInput, setSitemapInput] = useState('');
  const [urls, setUrls] = useState<SitemapURL[]>([]);
  const [stats, setStats] = useState({ total: 0, withLastmod: 0, withPriority: 0 });

  const extractURLs = () => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapInput, 'text/xml');
    
    const urlElements = xmlDoc.getElementsByTagName('url');
    const extracted: SitemapURL[] = [];
    let lastmodCount = 0;
    let priorityCount = 0;

    for (let i = 0; i < urlElements.length; i++) {
      const url = urlElements[i];
      const loc = url.getElementsByTagName('loc')[0]?.textContent || '';
      const lastmod = url.getElementsByTagName('lastmod')[0]?.textContent;
      const changefreq = url.getElementsByTagName('changefreq')[0]?.textContent;
      const priority = url.getElementsByTagName('priority')[0]?.textContent;

      if (loc) {
        extracted.push({
          loc,
          lastmod,
          changefreq,
          priority
        });
        if (lastmod) lastmodCount++;
        if (priority) priorityCount++;
      }
    }

    setUrls(extracted);
    setStats({
      total: extracted.length,
      withLastmod: lastmodCount,
      withPriority: priorityCount
    });
  };

  const downloadAsText = () => {
    const text = urls.map(url => url.loc).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap-urls.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAsCSV = () => {
    const headers = 'URL,Last Modified,Change Frequency,Priority\n';
    const rows = urls.map(url =>
      `"${url.loc}","${url.lastmod || ''}","${url.changefreq || ''}","${url.priority || ''}"`
    ).join('\n');
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap-urls.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sampleSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-01-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/contact</loc>
    <lastmod>2024-01-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Map className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sitemap URL Extractor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Extract and export all URLs from XML sitemaps
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Sitemap XML Input</h2>
          </div>
          <div className="p-6">
            <textarea
              value={sitemapInput}
              onChange={(e) => setSitemapInput(e.target.value)}
              placeholder="Paste your sitemap XML here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setSitemapInput(sampleSitemap)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm font-semibold"
              >
                Load Sample
              </button>
              <button
                onClick={extractURLs}
                disabled={!sitemapInput.trim()}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Extract URLs
              </button>
            </div>
          </div>
        </div>

        {urls.length > 0 && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Statistics
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.total}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total URLs</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {stats.withLastmod}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      With Last Modified
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.withPriority}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">With Priority</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  Extracted URLs ({urls.length})
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadAsText}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm font-semibold flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    TXT
                  </button>
                  <button
                    onClick={downloadAsCSV}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all text-sm font-semibold flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    CSV
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {urls.map((url, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                    >
                      <div className="font-mono text-sm text-blue-600 dark:text-blue-400 break-all mb-2">
                        {url.loc}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
                        {url.lastmod && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                            Modified: {url.lastmod}
                          </span>
                        )}
                        {url.changefreq && (
                          <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                            Frequency: {url.changefreq}
                          </span>
                        )}
                        {url.priority && (
                          <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">
                            Priority: {url.priority}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 flex items-start">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              About Sitemaps
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Sitemaps help search engines discover and crawl your pages</li>
              <li>• XML format is the standard for search engine sitemaps</li>
              <li>• Usually found at <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">yoursite.com/sitemap.xml</code></li>
              <li>• Can contain up to 50,000 URLs per sitemap file</li>
              <li>• Export as TXT for quick URL lists or CSV for detailed analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
