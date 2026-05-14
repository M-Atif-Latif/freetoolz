import { useState, useRef } from 'react';
import { Upload, RotateCcw, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function ImageCropper() {
  const howItWorks = [
    { title: 'Upload Image', description: 'Select an image from your computer' },
    { title: 'Select Area', description: 'Drag and adjust the crop area on the image' },
    { title: 'Choose Aspect', description: 'Select predefined aspect ratio or custom' },
    { title: 'Download', description: 'Save your cropped image' }
  ];

  const [image, setImage] = useState('');
  const [width, setWidth] = useState('800');
  const [height, setHeight] = useState('600');
  const [aspectRatio, setAspectRatio] = useState('16:9');
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

  const downloadCropped = () => {
    if (!image || !canvasRef.current) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = 'cropped-image.png';
    link.click();
  };

  const updateAspect = (ratio: string) => {
    setAspectRatio(ratio);
    if (ratio === '1:1') {
      setWidth('400');
      setHeight('400');
    } else if (ratio === '4:3') {
      setWidth('400');
      setHeight('300');
    } else if (ratio === '16:9') {
      setWidth('400');
      setHeight('225');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image Cropper</h1>
      <p className="text-gray-600 text-lg mb-8">Crop images to exact sizes and aspect ratios</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Upload Image</label>
          <label className="block px-6 py-4 bg-primary-50 border-2 border-dashed border-blue-300 rounded-lg text-center cursor-pointer hover:bg-primary-100 transition-colors">
            <Upload className="h-8 w-8 text-primary-600 mx-auto mb-2" />
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
              <label className="block text-sm font-medium text-gray-700 mb-4">Aspect Ratio</label>
              <div className="grid grid-cols-4 gap-2">
                {['1:1', '4:3', '16:9', 'Free'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => updateAspect(ratio)}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
                      aspectRatio === ratio
                        ? 'bg-accent-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center max-h-96 overflow-hidden">
              <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>

            <canvas
              ref={canvasRef}
              width={parseInt(width)}
              height={parseInt(height)}
              className="hidden"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setImage('')}
                className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-5 w-5" /> Clear
              </button>
              <button
                onClick={downloadCropped}
                className="flex-1 px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold flex items-center justify-center gap-2"
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

