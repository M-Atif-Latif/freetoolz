import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

interface PageItem {
  index: number;
  originalIndex: number;
}

export default function PDFPageReorder() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file with multiple pages' },
    { title: 'Reorder Pages', description: 'Use arrows to rearrange page order' },
    { title: 'Apply Changes', description: 'Create new PDF with reordered pages' },
    { title: 'Download', description: 'Save your reordered PDF' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        setTotalPages(pageCount);
        
        // Initialize pages array
        const pageItems: PageItem[] = [];
        for (let i = 0; i < pageCount; i++) {
          pageItems.push({ index: i, originalIndex: i });
        }
        setPages(pageItems);
        
        setStatus(`Loaded: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB) - ${pageCount} pages`);
      } catch (error) {
        setStatus('Error loading PDF: ' + error);
      }
    }
  };

  const movePage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= pages.length) return;
    
    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    
    // Update indices
    newPages.forEach((page, index) => {
      page.index = index;
    });
    
    setPages(newPages);
  };

  const resetOrder = () => {
    const resetPages: PageItem[] = [];
    for (let i = 0; i < totalPages; i++) {
      resetPages.push({ index: i, originalIndex: i });
    }
    setPages(resetPages);
  };

  const reorderPDF = async () => {
    if (!file || pages.length === 0) {
      setStatus('Please upload a PDF file first');
      return;
    }

    setProcessing(true);
    setStatus('Reordering pages...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      
      // Add pages in the new order
      for (const pageItem of pages) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageItem.originalIndex]);
        newPdf.addPage(copiedPage);
      }

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-reordered.pdf');
      a.click();

      setStatus('Pages reordered successfully!');
    } catch (error) {
      setStatus('Error reordering pages: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">PDF Page Reorder</h1>
      <p className="text-gray-600 text-lg mb-6">Rearrange pages in your PDF document</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files with multiple pages</p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {file && pages.length > 0 && (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">{file.name}</p>
              <p className="text-sm text-gray-600">Pages: {totalPages}</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Page Order</h3>
                <button
                  onClick={resetOrder}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset Order
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {pages.map((page, index) => (
                  <div
                    key={page.originalIndex}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-700">Page {page.originalIndex + 1}</span>
                      <span className="text-sm text-gray-500">→ Position {index + 1}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => movePage(index, index - 1)}
                        disabled={index === 0}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => movePage(index, index + 1)}
                        disabled={index === pages.length - 1}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reorderPDF}
              disabled={processing}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Reordering...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Reorder PDF
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
          </>
        )}
      </div>
    </div>
  );
}