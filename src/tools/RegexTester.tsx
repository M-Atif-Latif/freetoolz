import { useState } from 'react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex) || [];
      setMatches(Array.from(found));
    } catch (e) {
      setMatches(['Invalid regex pattern']);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Regex Tester</h1>
      <p className="text-gray-600 text-lg mb-6">Test regular expressions</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\d+" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Flags</label>
            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Test String</label>
          <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Test your regex here" className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg" rows={4} />
        </div>
        <button onClick={test} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">Test Regex</button>
      </div>
      {matches.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Matches ({matches.length})</h2>
          <div className="space-y-2">
            {matches.map((match, i) => (
              <div key={i} className="p-3 bg-green-50 rounded-lg border border-green-200 font-mono text-sm">{match}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
