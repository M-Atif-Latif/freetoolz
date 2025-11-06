import { useState } from 'react';

export default function UnixTimestamp() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));

  const convertToDate = () => {
    const d = new Date(parseInt(timestamp) * 1000);
    setDate(d.toISOString().slice(0, 16));
  };

  const convertToTimestamp = () => {
    const d = new Date(date);
    setTimestamp(Math.floor(d.getTime() / 1000).toString());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Unix Timestamp Converter</h1>
      <p className="text-gray-600 text-lg mb-6">Convert between Unix timestamps and dates</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Timestamp to Date</h2>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            placeholder="1234567890"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4"
          />
          <button onClick={convertToDate} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-4">Convert</button>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="font-mono text-gray-900">{new Date(parseInt(timestamp) * 1000).toString()}</div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Date to Timestamp</h2>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-4"
          />
          <button onClick={convertToTimestamp} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold mb-4">Convert</button>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="font-mono text-2xl font-bold text-gray-900">{Math.floor(new Date(date).getTime() / 1000)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
