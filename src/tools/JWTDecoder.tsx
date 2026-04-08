import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function JWTDecoder() {
  const howItWorks = [
    { title: 'Paste JWT Token', description: 'Paste your JSON Web Token in the input field' },
    { title: 'Auto Decode', description: 'The token is automatically decoded' },
    { title: 'View Payload', description: 'See the decoded header, payload, and signature' },
    { title: 'Copy Details', description: 'Copy any section for use in your code' }
  ];

  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [copied, setCopied] = useState(false);

  const parseJWT = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return { error: 'Invalid JWT format. Must have 3 parts.' };

      const decode = (str: string) => {
        const padding = '='.repeat((4 - (str.length % 4)) % 4);
        const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
        const decoded = atob(base64);
        return JSON.parse(decoded);
      };

      return {
        header: decode(parts[0]),
        payload: decode(parts[1]),
        signature: parts[2]
      };
    } catch (error) {
      return { error: 'Failed to decode JWT. Invalid format or characters.' };
    }
  };

  const decoded = parseJWT();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">JWT Decoder</h1>
      <p className="text-gray-600 text-lg mb-8">Decode and inspect JSON Web Tokens</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-sm focus:border-blue-500 outline-none h-24"
          />
        </div>

        {decoded && 'error' in decoded ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
            {decoded.error}
          </div>
        ) : decoded && 'header' in decoded ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">HEADER</div>
                <pre className="text-xs text-gray-800 break-words font-mono bg-white p-3 rounded border border-gray-200 mb-3 max-h-40 overflow-auto">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2))}
                  className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </button>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-semibold text-gray-700 mb-3">PAYLOAD</div>
                <pre className="text-xs text-gray-800 break-words font-mono bg-white p-3 rounded border border-gray-200 mb-3 max-h-40 overflow-auto">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2))}
                  className="w-full px-3 py-2 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy
                </button>
              </div>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg border border-purple-200 mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">SIGNATURE</div>
              <pre className="text-xs text-gray-800 break-all font-mono bg-white p-3 rounded border border-gray-200 mb-3 max-h-20 overflow-auto">
                {decoded.signature}
              </pre>
              <button
                onClick={() => copyToClipboard(decoded.signature)}
                className="w-full px-3 py-2 bg-purple-600 text-white rounded text-sm font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy
              </button>
            </div>
          </>
        ) : null}

        <button
          onClick={reset}
          className="w-full px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-5 w-5" /> Reset
        </button>
      </div>
    </div>
  );
}
