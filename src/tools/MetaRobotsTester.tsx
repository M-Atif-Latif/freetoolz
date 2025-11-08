import { useState } from 'react';
import { FileSearch, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';

interface RobotsMeta {
  tag: string;
  value: string;
  status: 'valid' | 'invalid' | 'warning';
  description: string;
}

export default function MetaRobotsTester() {
  const [htmlInput, setHtmlInput] = useState('');
  const [results, setResults] = useState<RobotsMeta[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const validRobotsDirectives = [
    'index', 'noindex', 'follow', 'nofollow',
    'noarchive', 'nosnippet', 'noodp', 'notranslate',
    'noimageindex', 'none', 'all', 'max-snippet',
    'max-image-preview', 'max-video-preview', 'unavailable_after'
  ];

  const analyzeRobotsMeta = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const metaTags = doc.querySelectorAll('meta[name="robots"], meta[name="googlebot"], meta[name="bingbot"]');
    
    const found: RobotsMeta[] = [];

    metaTags.forEach((tag) => {
      const name = tag.getAttribute('name') || 'unknown';
      const content = tag.getAttribute('content') || '';
      
      if (!content) {
        found.push({
          tag: name,
          value: '(empty)',
          status: 'invalid',
          description: 'Meta robots tag has no content attribute'
        });
        return;
      }

      const directives = content.toLowerCase().split(',').map(d => d.trim());
      
      directives.forEach(directive => {
        const [dir] = directive.split(':');
        const baseDir = dir.trim();

        if (validRobotsDirectives.includes(baseDir)) {
          found.push({
            tag: name,
            value: directive,
            status: 'valid',
            description: getDirectiveDescription(baseDir)
          });
        } else {
          found.push({
            tag: name,
            value: directive,
            status: 'invalid',
            description: `"${baseDir}" is not a recognized robots directive`
          });
        }
      });

      // Check for conflicting directives
      if (directives.includes('index') && directives.includes('noindex')) {
        found.push({
          tag: name,
          value: 'index, noindex',
          status: 'warning',
          description: 'Conflicting directives: both "index" and "noindex" present'
        });
      }
      if (directives.includes('follow') && directives.includes('nofollow')) {
        found.push({
          tag: name,
          value: 'follow, nofollow',
          status: 'warning',
          description: 'Conflicting directives: both "follow" and "nofollow" present'
        });
      }
    });

    if (found.length === 0) {
      found.push({
        tag: 'none',
        value: 'No meta robots tags found',
        status: 'warning',
        description: 'No robots meta tags detected in the HTML'
      });
    }

    setResults(found);
    setAnalyzed(true);
  };

  const getDirectiveDescription = (directive: string): string => {
    const descriptions: { [key: string]: string } = {
      'index': 'Allow search engines to index this page',
      'noindex': 'Prevent search engines from indexing this page',
      'follow': 'Allow search engines to follow links on this page',
      'nofollow': 'Prevent search engines from following links on this page',
      'noarchive': 'Prevent showing cached link in search results',
      'nosnippet': 'Prevent showing text snippet in search results',
      'noodp': 'Prevent using DMOZ description as snippet',
      'notranslate': 'Prevent offering translation in search results',
      'noimageindex': 'Prevent indexing images on this page',
      'none': 'Equivalent to noindex, nofollow',
      'all': 'Equivalent to index, follow',
      'max-snippet': 'Maximum length of text snippet',
      'max-image-preview': 'Maximum size of image preview',
      'max-video-preview': 'Maximum duration of video preview',
      'unavailable_after': 'Stop indexing after specified date'
    };
    return descriptions[directive] || 'Custom or unknown directive';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      default:
        return null;
    }
  };

  const sampleHTML = `<!DOCTYPE html>
<html>
<head>
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="max-snippet:150">
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <FileSearch className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meta Robots Tester
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Validate and analyze meta robots tags in your HTML
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">HTML Input</h2>
          </div>
          <div className="p-6">
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML here..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setHtmlInput(sampleHTML)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm font-semibold"
              >
                Load Sample
              </button>
              <button
                onClick={analyzeRobotsMeta}
                disabled={!htmlInput.trim()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze Meta Tags
              </button>
            </div>
          </div>
        </div>

        {analyzed && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border ${
                      result.status === 'valid'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : result.status === 'invalid'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">{getStatusIcon(result.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-bold text-gray-900 dark:text-white mr-2">
                            {result.tag}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-mono">
                            {result.value}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 flex items-start">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Common Robots Directives</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• <strong>index/noindex:</strong> Controls page indexing</li>
              <li>• <strong>follow/nofollow:</strong> Controls link following</li>
              <li>• <strong>noarchive:</strong> Prevents cached versions</li>
              <li>• <strong>nosnippet:</strong> Prevents text snippets</li>
              <li>• <strong>max-snippet:[number]:</strong> Limits snippet length</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
