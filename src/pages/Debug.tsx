import { toolMasterList, categories, tools } from '../data/tools';
import { useEffect, useState } from 'react';

interface SearchTest {
  query: string;
  results: number;
  expected: number;
  passed: boolean;
}

export default function Debug() {
  const [searchTests, setSearchTests] = useState<SearchTest[]>([]);
  const [allTestsPassed, setAllTestsPassed] = useState(false);

  useEffect(() => {
    // Run comprehensive search tests
    const tests: SearchTest[] = [
      {
        query: 'word',
        results: toolMasterList.filter(t => 
          t.name.toLowerCase().includes('word') || 
          t.description.toLowerCase().includes('word')
        ).length,
        expected: 3,
        passed: false
      },
      {
        query: 'pdf',
        results: toolMasterList.filter(t => 
          t.name.toLowerCase().includes('pdf') || 
          t.description.toLowerCase().includes('pdf')
        ).length,
        expected: 15,
        passed: false
      },
      {
        query: 'calculator',
        results: toolMasterList.filter(t => 
          t.name.toLowerCase().includes('calculator') || 
          t.description.toLowerCase().includes('calculator')
        ).length,
        expected: 8,
        passed: false
      },
      {
        query: 'converter',
        results: toolMasterList.filter(t => 
          t.name.toLowerCase().includes('converter') || 
          t.description.toLowerCase().includes('converter')
        ).length,
        expected: 10,
        passed: false
      },
    ];

    tests.forEach(t => {
      t.passed = t.results >= t.expected;
    });

    setSearchTests(tests);
    setAllTestsPassed(tests.every(t => t.passed));

    // Console logging for browser DevTools
    console.log('=== RUNTIME DEBUG INFO ===');
    console.log(`toolMasterList loaded: ${toolMasterList.length} tools`);
    console.log(`categories loaded: ${categories.length}`);
    console.log(`Search tests: ${tests.filter(t => t.passed).length}/${tests.length} passed`);
    tests.forEach(t => {
      console.log(`  ${t.query}: ${t.results}/${t.expected} (${t.passed ? '✅' : '❌'})`);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">🔍 Debug Dashboard</h1>
          <div className={`px-4 py-2 rounded font-bold ${
            allTestsPassed ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }`}>
            {allTestsPassed ? '✅ ALL TESTS PASS' : '❌ TESTS FAILING'}
          </div>
        </div>

        {/* Tool Counts */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">📊 Tool Data Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-600 dark:text-gray-300">tools.length</div>
              <div className="text-3xl font-bold">{tools.length}</div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-600 dark:text-gray-300">toolMasterList.length</div>
              <div className="text-3xl font-bold">{toolMasterList.length}</div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded">
              <div className="text-sm text-gray-600 dark:text-gray-300">categories.length</div>
              <div className="text-3xl font-bold">{categories.length}</div>
            </div>
          </div>
        </div>

        {/* Search Tests */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">🔎 Search Functionality Tests</h2>
          <div className="space-y-3">
            {searchTests.map(test => (
              <div 
                key={test.query}
                className={`p-4 rounded flex items-center justify-between ${
                  test.passed 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                }`}
              >
                <div>
                  <div className="font-bold text-lg">"{test.query}"</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Expected: ≥{test.expected} results
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{test.results}</div>
                  <div className={`text-sm font-bold ${
                    test.passed 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {test.passed ? '✅ PASS' : '❌ FAIL'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">📁 Categories</h2>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white dark:bg-gray-700 p-3 rounded text-sm">
                {cat.name}: <span className="font-bold">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Tools */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">📝 Sample Tools (First 5)</h2>
          <div className="space-y-4">
            {toolMasterList.slice(0, 5).map(tool => (
              <div key={tool.id} className="bg-white dark:bg-gray-700 p-4 rounded">
                <div className="font-bold">{tool.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">ID: {tool.id}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Category: {tool.category}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Slug: {tool.slug}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">{tool.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Data */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">📦 First Tool (Raw JSON)</h2>
          <pre className="bg-white dark:bg-gray-700 p-4 rounded text-xs overflow-x-auto whitespace-pre-wrap break-words max-h-96 overflow-y-auto">
            {JSON.stringify(toolMasterList[0], null, 2)}
          </pre>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 <strong>How to debug:</strong> Open browser DevTools (F12) → Console tab to see detailed log output above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
