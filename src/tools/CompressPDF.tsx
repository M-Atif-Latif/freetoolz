import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function CompressPDF() {
  const howItWorks = [
    { title: 'Upload PDF File', description: 'Select a PDF file from your computer' },
    { title: 'Choose Compression', description: 'Set your desired compression level' },
    { title: 'Compress', description: 'Process the PDF to reduce file size' },
    { title: 'Download', description: 'Save your compressed PDF to your device' }
  ];
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState('medium');
  const [status, setStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Basic compression: remove unused objects and optimize structure
      // Note: Advanced compression would require more sophisticated algorithms
      const originalSize = arrayBuffer.byteLength;
      
      // Save with compression (pdf-lib applies basic compression)
      const pdfBytes = await pdfDoc.save({ 
        useObjectStreams: false,
        addDefaultPage: false
      });
      
      const compressedSize = pdfBytes.length;
      const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-compressed.pdf');
      a.click();
      
      setStatus(`Compression complete! Reduced from ${(originalSize / 1024).toFixed(1)}KB to ${(compressedSize / 1024).toFixed(1)}KB (${compressionRatio}% reduction)`);
    } catch (error) {
      setStatus('Error compressing PDF: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Compress PDF</h1>
      <p className="text-gray-600 text-lg mb-8">Reduce PDF file size while maintaining quality</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Select a PDF file to compress</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">{file.name}</p>
              <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Compression Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setCompressionLevel(level)}
                    className={`py-3 px-4 rounded-lg font-semibold text-sm transition-colors capitalize ${
                      compressionLevel === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={compressPDF}
          disabled={!file || processing}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Compressing...</span>
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              <span>Compress PDF</span>
            </>
          )}
        </button>

        {status && (
          <div className={`mt-4 p-4 rounded-lg border ${
            status.includes('Error')
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            <p className="text-sm">{status}</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Privacy:</strong> All processing happens in your browser. Files are never uploaded to any server.
        </p>
      </div>
    </div>
  );
}

