import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function GradientGenerator() {
  const howItWorks = [
    { title: 'Choose Gradient Type', description: 'Select linear or radial gradient' },
    { title: 'Pick Colors', description: 'Choose starting and ending colors' },
    { title: 'Set Angle', description: 'Adjust the gradient direction angle' },
    { title: 'Copy CSS', description: 'Get ready-to-use CSS code' }
  ];

  const [type, setType] = useState('linear');
  const [color1, setColor1] = useState('#FF6B6B');
  const [color2, setColor2] = useState('#4ECDC4');
  const [angle, setAngle] = useState('135');
  const [copied, setCopied] = useState(false);

  const generateCSS = () => {
    if (type === 'linear') {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    } else {
      return `background: radial-gradient(circle, ${color1}, ${color2});`;
    }
  };

  const css = generateCSS();

  const copyCSS = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setType('linear');
    setColor1('#FF6B6B');
    setColor2('#4ECDC4');
    setAngle('135');
  };

  const gradientStyle =
    type === 'linear'
      ? { background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }
      : { background: `radial-gradient(circle, ${color1}, ${color2})` };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">CSS Gradient Generator</h1>
      <p className="text-gray-600 text-lg mb-8">Design beautiful gradients and copy CSS instantly</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Gradient Type</label>
          <div className="flex gap-3">
            <button
              onClick={() => setType('linear')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                type === 'linear'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setType('radial')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                type === 'radial'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Radial
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="h-12 w-20 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="h-12 w-20 rounded-lg cursor-pointer border-2 border-gray-200"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {type === 'linear' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">Angle: {angle}°</label>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0°</span>
              <span>180°</span>
              <span>360°</span>
            </div>
          </div>
        )}

        <div
          style={gradientStyle}
          className="w-full h-64 rounded-lg border-4 border-gray-300 shadow-lg mb-8"
        />

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 mb-6">
          <div className="text-sm text-gray-600 mb-3 font-semibold">CSS Code:</div>
          <div className="bg-white p-4 rounded border border-gray-200 font-mono text-sm text-gray-900 break-all mb-3">
            {css}
          </div>
          <button
            onClick={copyCSS}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy CSS'}
          </button>
        </div>

        <button
          onClick={reset}
          className="w-full px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <RotateCcw className="h-5 w-5" /> Reset
        </button>
      </div>
    </div>
  );
}
