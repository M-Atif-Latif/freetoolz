import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function ExtractPDFPages() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select the PDF file you want to extract from' },
    { title: 'Specify Pages', description: 'Enter the page numbers you want (e.g., 1-5, 7, 9-10)' },
    { title: 'Extract', description: 'Extract your specified pages into a new PDF' },
    { title: 'Download', description: 'Save your extracted PDF to your device' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageRange, setPageRange] = useState('1-5');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch (err) {
        setError('Error loading PDF');
      }
    }
  };

  const parsePageRange = (range: string, total: number): number[] => {
    const pages: Set<number> = new Set();
    const parts = range.split(',');

    for (let part of parts) {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(p => parseInt(p.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(total, end); i++) {
            pages.add(i);
          }
        }
      } else {
        const page = parseInt(part);
        if (!isNaN(page) && page >= 1 && page <= total) {
          pages.add(page);
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const extractPages = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    const pages = parsePageRange(pageRange, pageCount);
    if (pages.length === 0) {
      setError('No valid pages selected');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      for (const pageNum of pages) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', `-pages-${pageRange.replace(/,/g, '-')}.pdf`);
      a.click();
    } catch (err) {
      setError('Error extracting pages: ' + err);
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setPageRange('1-5');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Extract PDF Pages</h1>
      <p className="text-gray-600 text-lg mb-8">Extract specific pages from your PDF document</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Select a PDF file</p>
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
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-900">{file.name}</p>
            <p className="text-sm text-gray-600 mt-1">Total Pages: {pageCount}</p>
          </div>
        )}

        {file && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Range to Extract</label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g., 1-5, 7, 9-10"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none font-mono"
            />
            <p className="text-xs text-gray-500 mt-2">Format: Use commas for multiple ranges (e.g., 1-3, 5, 7-9)</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <button
            onClick={extractPages}
            disabled={!file || processing}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download className="h-5 w-5" />
            {processing ? 'Extracting...' : 'Extract Pages'}
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <strong>Privacy:</strong> All processing happens in your browser. Files are never uploaded to any server.
        </p>
      </div>
    </div>
  );
}
