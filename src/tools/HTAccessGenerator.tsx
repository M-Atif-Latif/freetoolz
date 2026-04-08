import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function HTAccessGenerator() {
  const howItWorks = [
    { title: 'Select Rule Type', description: 'Choose redirect, rewrite, or other rules' },
    { title: 'Enter Details', description: 'Fill in source and destination URLs' },
    { title: 'Configure Options', description: 'Set response codes and conditions' },
    { title: 'Copy .htaccess', description: 'Copy the generated code to your server' }
  ];

  const [ruleType, setRuleType] = useState('redirect');
  const [source, setSource] = useState('old-page');
  const [destination, setDestination] = useState('new-page');
  const [code, setCode] = useState('301');
  const [copied, setCopied] = useState(false);

  const generateHTAccess = () => {
    if (ruleType === 'redirect') {
      return `# Permanent Redirect (301)
RewriteEngine On
RewriteRule ^${source}/?$ /${destination} [R=${code},L]`;
    } else if (ruleType === 'https') {
      return `# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]`;
    } else if (ruleType === 'www') {
      return `# Force www
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(?!www\\.)(.+)$ [NC]
RewriteRule ^(.*)$ http://www.%1/$1 [R=301,L]`;
    } else if (ruleType === 'trailing') {
      return `# Remove trailing slash
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L]`;
    } else {
      return `# Custom rewrite rule
RewriteEngine On
RewriteRule ^${source}/?$ /${destination} [L]`;
    }
  };

  const htaccess = generateHTAccess();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htaccess);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setRuleType('redirect');
    setSource('old-page');
    setDestination('new-page');
    setCode('301');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">.htaccess Generator</h1>
      <p className="text-gray-600 text-lg mb-8">Generate Apache redirect and rewrite rules</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Rule Type</label>
          <select
            value={ruleType}
            onChange={(e) => setRuleType(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
          >
            <option value="redirect">Simple Redirect (301/302)</option>
            <option value="https">Force HTTPS</option>
            <option value="www">Force WWW</option>
            <option value="trailing">Remove Trailing Slash</option>
            <option value="custom">Custom Rewrite</option>
          </select>
        </div>

        {(ruleType === 'redirect' || ruleType === 'custom') && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source Path</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="old-page"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination URL</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="new-page"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {ruleType === 'redirect' && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Response Code</label>
                <select
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="301">301 Moved Permanently</option>
                  <option value="302">302 Found (Temporary)</option>
                  <option value="307">307 Temporary Redirect</option>
                </select>
              </div>
            )}
          </>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">.htaccess Code</label>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-auto h-48 mb-4 border border-gray-700">
            <pre>{htaccess}</pre>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
      </div>
    </div>
  );
}
