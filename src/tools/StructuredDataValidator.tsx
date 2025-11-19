import { useState } from 'react';
import { Code, CheckCircle, XCircle, AlertCircle, Copy, Info } from 'lucide-react';

interface ValidationResult {
  type: 'JSON-LD' | 'Microdata' | 'RDFa';
  schemaType: string;
  status: 'valid' | 'invalid' | 'warning';
  message: string;
  data?: any;
}

export default function StructuredDataValidator() {
  const [htmlInput, setHtmlInput] = useState('');
  const [results, setResults] = useState<ValidationResult[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const validateStructuredData = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const found: ValidationResult[] = [];

    // Check for JSON-LD
    const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');
    jsonLdScripts.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent || '');
        const schemaType = data['@type'] || 'Unknown';
        
        if (data['@context'] && data['@context'].includes('schema.org')) {
          found.push({
            type: 'JSON-LD',
            schemaType,
            status: 'valid',
            message: `Valid ${schemaType} schema found`,
            data
          });
        } else {
          found.push({
            type: 'JSON-LD',
            schemaType,
            status: 'warning',
            message: 'JSON-LD found but missing schema.org context',
            data
          });
        }
      } catch (error) {
        found.push({
          type: 'JSON-LD',
          schemaType: 'Invalid',
          status: 'invalid',
          message: `Invalid JSON-LD: ${error instanceof Error ? error.message : 'Parse error'}`
        });
      }
    });

    // Check for Microdata
    const microdataElements = doc.querySelectorAll('[itemscope]');
    microdataElements.forEach((element) => {
      const itemType = element.getAttribute('itemtype') || '';
      const schemaType = itemType.split('/').pop() || 'Unknown';
      
      if (itemType.includes('schema.org')) {
        found.push({
          type: 'Microdata',
          schemaType,
          status: 'valid',
          message: `Valid ${schemaType} microdata found`
        });
      } else {
        found.push({
          type: 'Microdata',
          schemaType,
          status: 'warning',
          message: 'Microdata found but not using schema.org vocabulary'
        });
      }
    });

    // Check for RDFa
    const rdfaElements = doc.querySelectorAll('[vocab], [typeof]');
    rdfaElements.forEach((element) => {
      const vocab = element.getAttribute('vocab') || '';
      const typeOf = element.getAttribute('typeof') || 'Unknown';
      
      if (vocab.includes('schema.org')) {
        found.push({
          type: 'RDFa',
          schemaType: typeOf,
          status: 'valid',
          message: `Valid ${typeOf} RDFa found`
        });
      } else {
        found.push({
          type: 'RDFa',
          schemaType: typeOf,
          status: 'warning',
          message: 'RDFa found but not using schema.org vocabulary'
        });
      }
    });

    if (found.length === 0) {
      found.push({
        type: 'JSON-LD',
        schemaType: 'None',
        status: 'warning',
        message: 'No structured data found in the HTML'
      });
    }

    setResults(found);
    setAnalyzed(true);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Sample Article",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "datePublished": "2024-01-01"
  }
  </script>
</head>
<body>
  <article itemscope itemtype="https://schema.org/BlogPosting">
    <h1 itemprop="headline">Hello World</h1>
    <p itemprop="author">Jane Smith</p>
  </article>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Structured Data Validator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Validate JSON-LD, Microdata, and RDFa schema markup
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">HTML Input</h2>
          </div>
          <div className="p-6">
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste your HTML with structured data..."
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setHtmlInput(sampleHTML)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm font-semibold"
              >
                Load Sample
              </button>
              <button
                onClick={validateStructuredData}
                disabled={!htmlInput.trim()}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Validate Schema
              </button>
            </div>
          </div>
        </div>

        {analyzed && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Validation Results ({results.length})
              </h2>
            </div>
            <div className="p-6 space-y-4">
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
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-3">{getStatusIcon(result.status)}</div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {result.type}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {result.schemaType}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.message}
                        </p>
                      </div>
                    </div>
                  </div>
                  {result.data && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          JSON-LD Data:
                        </span>
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(result.data, null, 2), idx)}
                          className="p-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-all"
                          title="Copy JSON"
                        >
                          {copiedIndex === idx ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                      <pre className="text-xs bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 flex items-start">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Structured Data Formats
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• <strong>JSON-LD:</strong> Recommended by Google, uses script tags</li>
              <li>• <strong>Microdata:</strong> Embedded in HTML tags with itemprop attributes</li>
              <li>• <strong>RDFa:</strong> Uses vocab and typeof attributes</li>
              <li>• All formats use <strong>schema.org</strong> vocabulary</li>
              <li>• Test with Google Rich Results Test for full validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
