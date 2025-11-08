import { useState } from 'react';

export default function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .trim();
    setOutput(minified);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">CSS Minifier</h1>
      <p className="text-gray-600 text-lg mb-6">Minify CSS code to reduce file size</p>
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-white rounded-xl shadow-lg border border-gray-200" />
        <textarea value={output} readOnly className="w-full p-6 text-gray-800 font-mono text-sm resize-none focus:outline-none min-h-[400px] bg-gray-50 rounded-xl shadow-lg border border-gray-200" />
      </div>
      <button onClick={minify} className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">Minify CSS</button>
    </div>
  );
}
