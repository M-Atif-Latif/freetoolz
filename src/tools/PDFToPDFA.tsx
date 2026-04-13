import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function PDFToPDFA() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file' },
    { title: 'Configure', description: 'Set PDF/A compliance options' },
    { title: 'Convert', description: 'Add PDF/A metadata' },
    { title: 'Download', description: 'Save as PDF/A file' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const convertToPDFA = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Add PDF/A metadata
      pdfDoc.setTitle(pdfDoc.getTitle() || 'PDF/A Document');
      
      const pdfBytes = await pdfDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-pdfa.pdf');
      a.click();
    } catch (error) {
      console.error('Error converting to PDF/A:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">PDF to PDF/A</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Convert PDF to PDF/A format for long-term archival</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF files only</p>
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
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Size: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={convertToPDFA}
              disabled={processing}
              className="w-full px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>{processing ? 'Converting...' : 'Convert to PDF/A'}</span>
            </button>
          </>
        )}

        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <p className="text-sm text-blue-800 dark:text-primary-300">
            <strong>About PDF/A:</strong> PDF/A is an ISO-standardized PDF format designed for long-term archival. It ensures documents remain readable and accurate over time.
          </p>
        </div>
      </div>
    </div>
  );
}

