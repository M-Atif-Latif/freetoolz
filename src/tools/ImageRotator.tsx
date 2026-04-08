import { useState, useRef } from 'react';
import { Upload, RotateCw, RotateCcw as RotateCCWIcon, Download, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function ImageRotator() {
  const howItWorks = [
    { title: 'Upload Image', description: 'Select an image from your computer' },
    { title: 'Choose Angle', description: 'Select 90°, 180°, 270°, or custom angle' },
    { title: 'Flip if Needed', description: 'Optionally flip horizontally or vertically' },
    { title: 'Download', description: 'Save your rotated image' }
  ];

  const [image, setImage] = useState('');
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTransform = () => {
    if (!image || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (flipH) ctx.scale(-1, 1);
      if (flipV) ctx.scale(1, -1);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
    };
    img.src = image;
  };

  const downloadImage = () => {
    applyTransform();
    setTimeout(() => {
      if (canvasRef.current) {
        const link = document.createElement('a');
        link.href = canvasRef.current.toDataURL('image/png');
        link.download = 'rotated-image.png';
        link.click();
      }
    }, 100);
  };

  const reset = () => {
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image Rotator</h1>
      <p className="text-gray-600 text-lg mb-8">Rotate and flip images online</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Upload Image</label>
          <label className="block px-6 py-4 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors">
            <Upload className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-700">Click to upload image</div>
            <div className="text-xs text-gray-500">PNG, JPG, GIF (max 10MB)</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {image && (
          <>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Quick Rotate</label>
              <div className="grid grid-cols-4 gap-2 mb-6">
                <button
                  onClick={() => setRotation(0)}
                  className={`py-3 px-2 rounded-lg font-semibold text-sm transition-colors ${
                    rotation === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  0°
                </button>
                <button
                  onClick={() => setRotation(90)}
                  className={`py-3 px-2 rounded-lg font-semibold text-sm transition-colors ${
                    rotation === 90
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  90°
                </button>
                <button
                  onClick={() => setRotation(180)}
                  className={`py-3 px-2 rounded-lg font-semibold text-sm transition-colors ${
                    rotation === 180
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  180°
                </button>
                <button
                  onClick={() => setRotation(270)}
                  className={`py-3 px-2 rounded-lg font-semibold text-sm transition-colors ${
                    rotation === 270
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  270°
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Angle: {rotation}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Flip Options</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    flipH
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <RotateCw className="h-5 w-5" /> Flip Horizontal
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    flipV
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <RotateCCWIcon className="h-5 w-5" /> Flip Vertical
                </button>
              </div>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center max-h-80 overflow-hidden">
              <img
                src={image}
                alt="Preview"
                style={{
                  transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setImage('');
                  reset();
                }}
                className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-5 w-5" /> Clear
              </button>
              <button
                onClick={downloadImage}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" /> Download
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
