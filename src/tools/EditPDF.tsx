import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileText } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function EditPDF() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to edit' },
    { title: 'Make Changes', description: 'Add text, remove pages, or reorder' },
    { title: 'Preview', description: 'Review your edits' },
    { title: 'Download', description: 'Save edited PDF' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<number[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      setPages(Array.from({ length: pageCount }, (_, i) => i));
    }
  };

  const removePageAtIndex = (index: number) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const savePDF = async () => {
    if (!file || pages.length === 0) return;
    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const sourceDoc = await PDFDocument.load(arrayBuffer);
      const newDoc = await PDFDocument.create();

      for (const pageIndex of pages) {
        const page = sourceDoc.getPage(pageIndex);
        const copiedPage = await newDoc.embedPage(page);
        newDoc.addPage([copiedPage.width, copiedPage.height]);
      }

      const pdfBytes = await newDoc.save();
      const blob = createBlobFromBytes(pdfBytes, 'application/pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-edited.pdf');
      a.click();
    } catch (error) {
      console.error('Error editing PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Edit PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Remove, reorder, or delete pages from your PDF</p>

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

        {file && pages.length > 0 && (
          <>
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pages: {pages.length}</p>
            </div>

            <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
              {pages.map((_, displayIndex) => (
                <div
                  key={displayIndex}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {displayIndex + 1}
                  </span>
                  <button
                    onClick={() => removePageAtIndex(displayIndex)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={savePDF}
              disabled={processing || pages.length === 0}
              className="w-full px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>{processing ? 'Processing...' : 'Save Edited PDF'}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

