import { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';

export default function ImageBackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [processed, setProcessed] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProcessed('');
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeBackground = () => {
    if (!preview) return;

    setLoading(true);
    const canvas = document.createElement('canvas');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        setLoading(false);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Simple background removal algorithm
      // This removes white/light backgrounds
      const threshold = 240;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0; // Set alpha to 0 (transparent)
        }
      }

      ctx.putImageData(imageData, 0, 0);
      
      // Convert to PNG with transparency
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setProcessed(url);
          setLoading(false);
        }
      }, 'image/png');
    };
    
    img.onerror = () => {
      setLoading(false);
      alert('Failed to load image');
    };
    
    img.src = preview;
  };

  const downloadImage = () => {
    if (!processed) return;
    const a = document.createElement('a');
    a.href = processed;
    a.download = file?.name.replace(/\.[^/.]+$/, '') + '-no-bg.png' || 'image-no-bg.png';
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Background Remover</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">Remove backgrounds from images (works best with white/light backgrounds)</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        {/* Info Banner */}
        <div className="mb-6 flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-semibold mb-1">Note:</p>
            <p>This tool works best for images with white or light-colored backgrounds. For complex backgrounds, consider using professional tools like remove.bg</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {preview && (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original</h3>
                <img src={preview} alt="Original" className="w-full rounded-lg border border-gray-200 dark:border-gray-700" />
              </div>
              {processed && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Removed</h3>
                  <div className="relative">
                    {/* Checkerboard background to show transparency */}
                    <div 
                      className="absolute inset-0 rounded-lg" 
                      style={{
                        backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    />
                    <img src={processed} alt="Processed" className="relative w-full rounded-lg" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={removeBackground}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Remove Background'}
              </button>

              {processed && (
                <button
                  onClick={downloadImage}
                  className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download</span>
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* How it works section */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p>
            <strong>1. Upload Image:</strong> Select an image with a white or light-colored background.
          </p>
          <p>
            <strong>2. Remove Background:</strong> Click the button to process the image and remove the background.
          </p>
          <p>
            <strong>3. Download:</strong> Save the image with transparent background as PNG.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Note:</strong> This is a basic client-side tool. For professional background removal with AI, we recommend using dedicated services like remove.bg, Photoshop, or GIMP.
          </p>
        </div>
      </div>
    </div>
  );
}
