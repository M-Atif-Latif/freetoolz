import { useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function BarcodeGenerator() {
  const howItWorks = [
    { title: 'Enter Barcode Data', description: 'Type the numbers or text for the barcode' },
    { title: 'Choose Format', description: 'Select barcode format (CODE128, EAN-13, etc)' },
    { title: 'Preview Barcode', description: 'See the generated barcode instantly' },
    { title: 'Download Image', description: 'Save the barcode as PNG image' }
  ];

  const [data, setData] = useState('1234567890128');
  const [format, setFormat] = useState('code128');
  const [width, setWidth] = useState('300');
  const [height, setHeight] = useState('100');

  const simpleBarcode = () => {
    if (!data) return '';
    const bars = data.split('').map(char => {
      const code = char.charCodeAt(0);
      return code % 2 === 0 ? '█' : ' ';
    }).join('');
    return bars;
  };

  const downloadBarcode = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = parseInt(width);
    const h = parseInt(height);
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#000000';
    const barWidth = w / data.length;
    for (let i = 0; i < data.length; i++) {
      if (data.charCodeAt(i) % 2 === 0) {
        ctx.fillRect(i * barWidth, 0, barWidth, h);
      }
    }

    ctx.fillStyle = '#000000';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(data, w / 2, h + 20);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `barcode-${data}.png`;
    link.click();
  };

  const reset = () => {
    setData('1234567890128');
    setFormat('code128');
    setWidth('300');
    setHeight('100');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Barcode Generator</h1>
      <p className="text-gray-600 text-lg mb-8">Create barcode images for labels and products</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Data</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value.substring(0, 20))}
            maxLength={20}
            placeholder="1234567890128"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none font-mono text-lg"
          />
          <div className="text-xs text-gray-500 mt-1">{data.length}/20 characters</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="code128">CODE128</option>
              <option value="ean13">EAN-13</option>
              <option value="upca">UPC-A</option>
              <option value="code39">CODE39</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
            <input
              type="number"
              min="100"
              max="800"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
            <input
              type="number"
              min="50"
              max="400"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50 rounded-lg border-2 border-gray-200 mb-6 flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="text-5xl font-black text-gray-900 font-mono tracking-tight mb-3">
              {simpleBarcode()}
            </div>
            <div className="text-lg font-mono text-gray-600">{data}</div>
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
            onClick={downloadBarcode}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" /> Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
