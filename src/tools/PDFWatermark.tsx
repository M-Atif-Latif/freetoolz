import { useState } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Upload, RotateCcw, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFWatermark() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file from your computer' },
    { title: 'Enter Watermark Text', description: 'Type the text you want as a watermark' },
    { title: 'Customize Settings', description: 'Adjust opacity, size, and rotation' },
    { title: 'Download', description: 'Save the watermarked PDF' }
  ];

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('DRAFT');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(60);
  const [rotation, setRotation] = useState(-45);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const reset = () => {
    setWatermarkText('DRAFT');
    setOpacity(0.3);
    setFontSize(60);
    setRotation(-45);
    setPdfFile(null);
    setStatus('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setStatus(`Loaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
    }
  };

  const addWatermark = async () => {
    if (!pdfFile) {
      setStatus('Please upload a PDF file first');
      return;
    }

    if (!watermarkText.trim()) {
      setStatus('Please enter watermark text');
      return;
    }

    setProcessing(true);
    setStatus('Adding watermark...');

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Get the font
      const font = await pdfDoc.embedStandardFont('Helvetica' as any);
      
      // Process each page
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        const { width, height } = page.getSize();
        
        // Add watermark to center of page
        page.drawText(watermarkText, {
          x: width / 2 - (watermarkText.length * fontSize * 0.3) / 2,
          y: height / 2,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
          opacity: opacity,
          rotate: degrees(rotation),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfFile.name.replace('.pdf', '-watermarked.pdf');
      a.click();

      setStatus('Watermark added successfully!');
    } catch (error) {
      setStatus('Error adding watermark: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">PDF Watermark</h1>
      <p className="text-gray-600 text-lg mb-6">Add custom watermarks to PDF documents</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {pdfFile && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">{pdfFile.name}</p>
              <p className="text-sm text-gray-600">Size: {(pdfFile.size / 1024).toFixed(2)} KB</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Watermark Text</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="DRAFT"
                maxLength={30}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opacity: {(opacity * 100).toFixed(0)}%</label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rotation: {rotation}°</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <div className="mb-6 p-8 bg-gray-50 rounded-lg border-4 border-gray-200 relative overflow-hidden h-64 flex items-center justify-center">
              <div
                style={{
                  fontSize: `${fontSize}px`,
                  opacity: opacity,
                  transform: `rotate(${rotation}deg)`,
                  fontWeight: 'bold'
                }}
                className="text-gray-800 text-center pointer-events-none"
              >
                {watermarkText}
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={reset}
                className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-5 w-5" /> Reset
              </button>
              <button
                onClick={addWatermark}
                disabled={processing}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" /> Add Watermark
                  </>
                )}
              </button>
            </div>

            {status && (
              <div className={`p-4 rounded-lg border ${
                status.includes('Error')
                  ? 'bg-red-50 border-red-200 text-red-700'
                  : 'bg-green-50 border-green-200 text-green-700'
              }`}>
                <p className="text-sm">{status}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
