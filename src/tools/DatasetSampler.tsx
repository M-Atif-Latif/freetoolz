import { useState } from 'react';
import { Database, Shuffle } from 'lucide-react';

export default function DatasetSampler() {
  const [csvInput, setCsvInput] = useState('');
  const [sampleSize, setSampleSize] = useState('10');
  const [sampledData, setSampledData] = useState('');
  const [totalRows, setTotalRows] = useState(0);

  const sampleData = () => {
    const lines = csvInput.trim().split('\n');
    const size = parseInt(sampleSize);

    if (lines.length === 0 || isNaN(size) || size <= 0) return;

    // Keep header
    const header = lines[0];
    const dataRows = lines.slice(1);

    // Random sampling
    const shuffled = [...dataRows].sort(() => Math.random() - 0.5);
    const sampled = shuffled.slice(0, Math.min(size, dataRows.length));

    const result = [header, ...sampled].join('\n');
    setSampledData(result);
    setTotalRows(dataRows.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
            <Database className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dataset Sampler
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Extract random samples from large CSV datasets for testing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Full Dataset (CSV)</h2>
            </div>
            <div className="p-6">
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                placeholder="name,age,city&#10;John,30,NYC&#10;Jane,25,LA&#10;..."
                className="w-full h-80 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none mb-4"
              />
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Sample Size
                </label>
                <input
                  type="number"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(e.target.value)}
                  min="1"
                  placeholder="10"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={sampleData}
                disabled={!csvInput.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
              >
                <Shuffle className="h-5 w-5 mr-2" />
                Generate Random Sample
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                Sampled Data {totalRows > 0 && `(${parseInt(sampleSize)} of ${totalRows})`}
              </h2>
            </div>
            <div className="p-6">
              <textarea
                value={sampledData}
                readOnly
                className="w-full h-80 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm resize-none mb-4"
              />
              {sampledData && (
                <button
                  onClick={() => navigator.clipboard.writeText(sampledData)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  Copy Sample
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💡 Use Cases</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>• Test code with subset of large datasets</li>
            <li>• Create training/validation splits</li>
            <li>• Generate representative samples for analysis</li>
            <li>• Random sampling preserves data structure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
