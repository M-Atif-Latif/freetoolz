import { useState } from 'react';
import { Database, Trash2 } from 'lucide-react';

export default function CSVDuplicateFinder() {
  const [csvInput, setCsvInput] = useState('');
  const [columnIndex, setColumnIndex] = useState('0');
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [uniqueCSV, setUniqueCSV] = useState('');
  const [stats, setStats] = useState({ total: 0, unique: 0, duplicates: 0 });

  const findDuplicates = () => {
    const lines = csvInput.trim().split('\n');
    if (lines.length === 0) return;

    const colIdx = parseInt(columnIndex);
    const seen = new Set<string>();
    const dupes: string[] = [];
    const uniqueLines: string[] = [];

    lines.forEach((line, idx) => {
      const columns = line.split(',');
      const key = columns[colIdx]?.trim() || line;

      if (seen.has(key)) {
        dupes.push(`Line ${idx + 1}: ${line}`);
      } else {
        seen.add(key);
        uniqueLines.push(line);
      }
    });

    setDuplicates(dupes);
    setUniqueCSV(uniqueLines.join('\n'));
    setStats({
      total: lines.length,
      unique: uniqueLines.length,
      duplicates: dupes.length,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Database className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CSV Duplicate Finder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find and remove duplicate rows in CSV files
          </p>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">CSV Input</h2>
          </div>
          <div className="p-6">
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="name,email,age&#10;John,john@example.com,30&#10;Jane,jane@example.com,25&#10;John,john@example.com,30"
              className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Check Column (0-indexed)
              </label>
              <input
                type="number"
                value={columnIndex}
                onChange={(e) => setColumnIndex(e.target.value)}
                min="0"
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <button
              onClick={findDuplicates}
              disabled={!csvInput.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Find Duplicates
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Rows</div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Unique Rows</div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                {stats.unique}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Duplicates</div>
              <div className="text-4xl font-bold text-red-600 dark:text-red-400">
                {stats.duplicates}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {duplicates.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Duplicates */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Duplicate Rows Found</h2>
              </div>
              <div className="p-6">
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {duplicates.map((dup, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 font-mono text-sm text-gray-900 dark:text-white"
                    >
                      {dup}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Unique CSV */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                <h2 className="text-lg font-semibold text-white">Cleaned CSV (No Duplicates)</h2>
              </div>
              <div className="p-6">
                <textarea
                  value={uniqueCSV}
                  readOnly
                  className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(uniqueCSV)}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Copy Cleaned CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 How It Works</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Paste your CSV data with comma-separated values</li>
            <li>• Choose which column to check for duplicates (0 = first column)</li>
            <li>• Keeps the first occurrence and marks rest as duplicates</li>
            <li>• Download cleaned CSV without duplicate rows</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
