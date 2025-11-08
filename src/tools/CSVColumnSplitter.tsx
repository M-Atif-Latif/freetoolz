import { useState } from 'react';
import { Table, Plus, Minus } from 'lucide-react';

export default function CSVColumnSplitter() {
  const [csvText, setCsvText] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [mode, setMode] = useState<'split' | 'join'>('split');
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);

  const parseCSV = (text: string): string[][] => {
    if (!text.trim()) return [];
    const lines = text.trim().split('\n');
    return lines.map(line => line.split(delimiter).map(cell => cell.trim()));
  };

  const data = parseCSV(csvText);
  const headers = data[0] || [];

  const toggleColumn = (index: number) => {
    setSelectedColumns(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index].sort((a, b) => a - b)
    );
  };

  const getResult = (): string => {
    if (data.length === 0) return '';
    
    if (mode === 'split') {
      if (selectedColumns.length === 0) return '';
      return data
        .map(row => selectedColumns.map(i => row[i] || '').join(delimiter))
        .join('\n');
    } else {
      // Join mode - combine all columns
      return data.map(row => row.join(delimiter)).join('\n');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Table className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            CSV Column Splitter / Joiner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Split CSV files by selecting specific columns or join multiple CSV columns into one file.
          </p>
        </div>

        {/* Mode & Delimiter */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Mode</label>
            <div className="flex gap-3">
              <button
                onClick={() => setMode('split')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'split'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Minus className="h-4 w-4" />
                <span>Split</span>
              </button>
              <button
                onClick={() => setMode('join')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                  mode === 'join'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Join</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Delimiter</label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="\t">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            CSV Data
          </label>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="Name,Email,Age,City&#10;John,john@email.com,30,NYC&#10;Jane,jane@email.com,25,LA"
            className="w-full h-48 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none font-mono text-sm"
          />
        </div>

        {/* Column Selection */}
        {mode === 'split' && headers.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Select Columns to Extract
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {headers.map((header, index) => (
                <button
                  key={index}
                  onClick={() => toggleColumn(index)}
                  className={`p-3 rounded-lg border-2 transition-all font-medium ${
                    selectedColumns.includes(index)
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                  }`}
                >
                  {header || `Column ${index + 1}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Output */}
        {getResult() && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Result</h2>
            </div>
            <div className="p-6">
              <pre className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto font-mono text-sm">
                {getResult()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
