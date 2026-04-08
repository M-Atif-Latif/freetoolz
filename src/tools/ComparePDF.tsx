import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Eye } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function ComparePDF() {
  const howItWorks = [
    { title: 'Upload PDFs', description: 'Select two PDF files to compare' },
    { title: 'Load', description: 'Load both documents' },
    { title: 'Compare', description: 'Identify differences' },
    { title: 'Download', description: 'Save comparison report' }
  ];

  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [comparison, setComparison] = useState<{ pages1: number; pages2: number } | null>(null);

  const handleFile1Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile1(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setComparison(prev => ({ pages1: pdf.getPageCount(), pages2: prev?.pages2 || 0 }));
    }
  };

  const handleFile2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile2(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setComparison(prev => ({ pages1: prev?.pages1 || 0, pages2: pdf.getPageCount() }));
    }
  };

  const comparePDFs = async () => {
    if (!file1 || !file2) return;
    setProcessing(true);

    try {
      const ab1 = await file1.arrayBuffer();
      const ab2 = await file2.arrayBuffer();
      const pdf1 = await PDFDocument.load(ab1);
      const pdf2 = await PDFDocument.load(ab2);

      const pages1 = pdf1.getPageCount();
      const pages2 = pdf2.getPageCount();

      // Create comparison report
      const newDoc = await PDFDocument.create();
      const page = newDoc.addPage([600, 400]);
      page.drawText('PDF Comparison Report', { x: 50, y: 350, size: 24 });
      page.drawText(`File 1: ${file1.name} (${pages1} pages)`, { x: 50, y: 300, size: 12 });
      page.drawText(`File 2: ${file2.name} (${pages2} pages)`, { x: 50, y: 270, size: 12 });
      
      if (pages1 !== pages2) {
        page.drawText(`⚠ Different page counts: ${pages1} vs ${pages2}`, { x: 50, y: 240, size: 12 });
      } else {
        page.drawText(`✓ Same page count: ${pages1} pages`, { x: 50, y: 240, size: 12 });
      }

      const pdfBytes = await newDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'comparison-report.pdf';
      a.click();
    } catch (error) {
      console.error('Error comparing PDFs:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Compare PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Compare two PDF files and identify differences</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Click to upload first PDF</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile1Change}
                className="hidden"
              />
            </label>
            {file1 && (
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{file1.name}</p>
            )}
          </div>

          <div>
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Click to upload second PDF</p>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFile2Change}
                className="hidden"
              />
            </label>
            {file2 && (
              <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{file2.name}</p>
            )}
          </div>
        </div>

        {comparison && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Pages:</strong> {comparison.pages1} vs {comparison.pages2}
            </p>
          </div>
        )}

        {file1 && file2 && (
          <button
            onClick={comparePDFs}
            disabled={processing}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Eye className="h-5 w-5" />
            <span>{processing ? 'Comparing...' : 'Compare PDFs'}</span>
          </button>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>For detailed diff:</strong> Use Adobe Acrobat's "Compare Documents" or online diff tools like DiffNow for more advanced comparison.
        </p>
      </div>
    </div>
  );
}
