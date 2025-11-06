import { useState } from 'react';

export default function HTMLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const entities: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  const convert = () => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, m => entities[m]));
    } else {
      let decoded = input;
      Object.entries(entities).forEach(([char, entity]) => {
        decoded = decoded.replace(new RegExp(entity, 'g'), char);
      });
      setOutput(decoded);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">HTML Entity Encoder/Decoder</h1>
      <div className="flex justify-center mb-6">
        <button onClick={() => setMode('encode')} className={`px-6 py-2 rounded-l-lg font-medium ${mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-6 py-2 rounded-r-lg font-medium ${mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Decode</button>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Input..." className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200" />
        <textarea value={output} readOnly placeholder="Output..." className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-gray-50 rounded-xl shadow-lg border border-gray-200" />
      </div>
      <button onClick={convert} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">Convert</button>
    </div>
  );
}
