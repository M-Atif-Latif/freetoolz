import { useState } from 'react';

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<{ type: string; value: string }[]>([]);

  const compareTexts = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const result = [];

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        result.push({ type: 'same', value: line1 });
      } else if (!line2) {
        result.push({ type: 'removed', value: line1 });
      } else if (!line1) {
        result.push({ type: 'added', value: line2 });
      } else {
        result.push({ type: 'removed', value: line1 });
        result.push({ type: 'added', value: line2 });
      }
    }
    setDiff(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Text Diff Checker</h1>
      <p className="text-gray-600 text-lg mb-6">Compare two texts and see differences</p>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <textarea value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Original text..." className="w-full p-6 text-gray-800 resize-none focus:outline-none min-h-[300px] bg-white rounded-xl shadow-lg border border-gray-200" />
        <textarea value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Modified text..." className="w-full p-6 text-gray-800 resize-none focus:outline-none min-h-[300px] bg-white rounded-xl shadow-lg border border-gray-200" />
      </div>
      <button onClick={compareTexts} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg mb-6">Compare</button>
      {diff.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Differences</h2>
          <div className="space-y-1 font-mono text-sm">
            {diff.map((line, i) => (
              <div key={i} className={`p-2 ${line.type === 'added' ? 'bg-green-100' : line.type === 'removed' ? 'bg-red-100' : 'bg-gray-50'}`}>
                <span className="mr-2">{line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}</span>
                {line.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
