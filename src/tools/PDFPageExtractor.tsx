import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileText, Download } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import CopyButton from '../components/CopyButton';

export default function PDFPageExtractor() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file from your computer' },
    { title: 'Specify Pages', description: 'Enter page numbers or ranges (e.g., 1,3,5-7)' },
    { title: 'Extract', description: 'Create a new PDF with selected pages' },
    { title: 'Download', description: 'Save your extracted PDF' }
  ];

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  const [status, setStatus] = useState('');
  const [processing, setProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setStatus(`Loaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        setTotalPages(pageCount);
        setStatus(`Loaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB) - ${pageCount} pages`);
      } catch (error) {
        setStatus('Error loading PDF: ' + error);
      }
    }
  };

  const parsePageRange = (range: string): number[] => {
    const pages: number[] = [];
    const parts = range.split(',').map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) {
              pages.push(i - 1); // Convert to 0-based index
            }
          }
        }
      } else {
        const page = parseInt(part);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          pages.push(page - 1); // Convert to 0-based index
        }
      }
    }
    
    return [...new Set(pages)].sort((a, b) => a - b); // Remove duplicates and sort
  };

  const extractPages = async () => {
    if (!pdfFile) {
      setStatus('Please upload a PDF file first');
      return;
    }

    if (!pageRange.trim()) {
      setStatus('Please specify page numbers to extract');
      return;
    }

    setProcessing(true);
    setStatus('Extracting pages...');

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const selectedPages = parsePageRange(pageRange);

      if (selectedPages.length === 0) {
        setStatus('No valid pages found in the specified range');
        setProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, selectedPages);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted-pages-${pageRange.replace(/[^0-9,-]/g, '')}.pdf`;
      a.click();

      setStatus(`Successfully extracted ${selectedPages.length} page(s)`);
    } catch (error) {
      setStatus('Error extracting pages: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">PDF Page Extractor</h1>
      <p className="text-gray-600 text-lg mb-6">Extract specific pages from PDF documents</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileText className="w-12 h-12 mb-4 text-gray-400" />
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Range</label>
            <input
              type="text"
              value={pageRange}
              onChange={(e) => setPageRange(e.target.value)}
              placeholder="e.g., 1-3, 5, 7-9"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring focus:ring-red-200 transition-all outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter page numbers or ranges (e.g., 1-5, 7, 9-10). Total pages: {totalPages}
            </p>
          </div>
        )}

        <button
          onClick={extractPages}
          disabled={!pdfFile || processing}
          className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Extract Pages
            </>
          )}
        </button>

        {status && (
          <div className={`mt-4 p-4 rounded-lg border ${
            status.includes('Error') || status.includes('⚠️')
              ? 'bg-red-50 border-red-200 text-red-700'
              : status.includes('Successfully')
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-primary-50 border-primary-200 text-primary-700'
          }`}>
            <p className="text-sm">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

