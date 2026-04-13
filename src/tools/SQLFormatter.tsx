import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function SQLFormatter() {
  const howItWorks = [
    { title: 'Paste SQL Query', description: 'Paste your SQL code in the input field' },
    { title: 'Auto Format', description: 'SQL is automatically formatted with proper spacing' },
    { title: 'View Formatted', description: 'See clean, readable SQL with proper indentation' },
    { title: 'Copy Result', description: 'Copy the formatted SQL to clipboard' }
  ];

  const [sql, setSql] = useState('SELECT id, name, email, created_at FROM users WHERE status = "active" ORDER BY created_at DESC LIMIT 10;');
  const [copied, setCopied] = useState(false);

  const formatSQL = (sqlString: string) => {
    const keywords = /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|VIEW|DATABASE|UNION|CASE|WHEN|THEN|ELSE|END)\b/gi;

    let formatted = sqlString
      .replace(/,/g, ',\n  ')
      .replace(/\s+/g, ' ')
      .trim();

    formatted = formatted.replace(keywords, '\n$1');
    formatted = formatted.split('\n').map(line => line.trim()).filter(line => line).join('\n');

    return formatted;
  };

  const formatted = formatSQL(sql);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setSql('SELECT id, name, email, created_at FROM users WHERE status = "active" ORDER BY created_at DESC LIMIT 10;');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">SQL Formatter</h1>
      <p className="text-gray-600 text-lg mb-8">Beautify and format SQL queries instantly</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">SQL Input</label>
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            placeholder="Paste your SQL query here..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-sm focus:border-primary-500 outline-none h-32"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Formatted Output</label>
          <div className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg font-mono text-sm bg-primary-50 h-48 overflow-auto whitespace-pre-wrap break-words">
            {formatted}
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
            className="flex-1 px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Copy Formatted'}
          </button>
        </div>
      </div>
    </div>
  );
}

