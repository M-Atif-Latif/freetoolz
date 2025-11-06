import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Password Generator</h1>
      <p className="text-gray-600 text-lg mb-8">Generate secure, random passwords</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Generated Password</label>
          <div className="relative">
            <input type="text" value={password} readOnly placeholder="Click 'Generate Password' to create"
              className="w-full px-4 py-4 pr-32 border-2 border-gray-200 rounded-lg text-lg font-mono bg-gray-50 focus:outline-none" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button onClick={generatePassword} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button onClick={copyToClipboard} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">Password Length: {length}</label>
          </div>
          <input type="range" min="8" max="32" value={length} onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>

        <button onClick={generatePassword}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg">
          Generate Password
        </button>
      </div>
    </div>
  );
}
