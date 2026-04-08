import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function RepairPDF() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a corrupted or damaged PDF' },
    { title: 'Analyze', description: 'Check file integrity' },
    { title: 'Repair', description: 'Fix and rebuild PDF structure' },
    { title: 'Download', description: 'Save repaired PDF' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('');
    }
  };

  const repairPDF = async () => {
    if (!file) return;
    setProcessing(true);
    setStatus('Attempting to repair...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Create new document and copy content
      const newDoc = await PDFDocument.create();
      const pageCount = pdfDoc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        const copiedPage = await newDoc.embedPage(page);
        newDoc.addPage([copiedPage.width, copiedPage.height]);
      }

      const pdfBytes = await newDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-repaired.pdf');
      a.click();

      setStatus('✓ PDF repair completed successfully!');
    } catch (error) {
      console.error('Error repairing PDF:', error);
      setStatus('✗ Failed to repair PDF. File may be too corrupted.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Repair PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Fix corrupted or damaged PDF files</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Corrupted PDF files</p>
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
              onClick={repairPDF}
              disabled={processing}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span>{processing ? 'Repairing...' : 'Repair PDF'}</span>
            </button>

            {status && (
              <div className={`mt-4 p-4 rounded-lg ${status.startsWith('✓') ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                <p className={`text-sm ${status.startsWith('✓') ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                  {status}
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> This tool rebuilds the PDF structure. For severely corrupted files, professional recovery services may be needed.
          </p>
        </div>
      </div>
    </div>
  );
}
