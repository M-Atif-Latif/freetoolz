import { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = useState('#3B82F6');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (value: string, type: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(color);
  const rgbString = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Palette className="h-16 w-16 mx-auto text-pink-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Color Picker</h1>
        <p className="text-gray-600 text-lg">Pick and convert colors</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-64 h-64 mx-auto rounded-2xl cursor-pointer border-4 border-gray-200 shadow-lg"
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">HEX</p>
              <p className="text-2xl font-mono font-bold text-gray-900">{color.toUpperCase()}</p>
            </div>
            <button
              onClick={() => copyToClipboard(color, 'hex')}
              className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            >
              {copied === 'hex' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">RGB</p>
              <p className="text-2xl font-mono font-bold text-gray-900">{rgbString}</p>
            </div>
            <button
              onClick={() => copyToClipboard(rgbString, 'rgb')}
              className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            >
              {copied === 'rgb' ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <div className="p-8 rounded-xl border-4 border-gray-200" style={{ backgroundColor: color }}>
            <p className="text-center font-bold text-2xl drop-shadow-lg" style={{
              color: parseInt(color.slice(1), 16) > 0xffffff/2 ? '#000000' : '#ffffff'
            }}>
              Preview
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
