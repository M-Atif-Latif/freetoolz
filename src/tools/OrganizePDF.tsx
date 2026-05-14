import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Shuffle } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';
import { createBlobFromBytes } from '../utils/blob';

export default function OrganizePDF() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to organize' },
    { title: 'Arrange', description: 'Reorder, merge, or delete pages' },
    { title: 'Preview', description: 'Review your changes' },
    { title: 'Download', description: 'Save organized PDF' }
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

  const movePageUp = (index: number) => {
    if (index === 0) return;
    const newPages = [...pages];
    [newPages[index - 1], newPages[index]] = [newPages[index], newPages[index - 1]];
    setPages(newPages);
  };

  const movePageDown = (index: number) => {
    if (index === pages.length - 1) return;
    const newPages = [...pages];
    [newPages[index], newPages[index + 1]] = [newPages[index + 1], newPages[index]];
    setPages(newPages);
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
      a.download = file.name.replace('.pdf', '-organized.pdf');
      a.click();
    } catch (error) {
      console.error('Error organizing PDF:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Organize PDF</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">Reorder, merge, delete, and organize PDF pages</p>

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
              <p className="font-semibold text-gray-900 dark:text-white mb-1">{file.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pages: {pages.length}</p>
            </div>

            <div className="mb-6 space-y-2 max-h-96 overflow-y-auto">
              {pages.map((_, displayIndex) => (
                <div
                  key={displayIndex}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {displayIndex + 1}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => movePageUp(displayIndex)}
                      disabled={displayIndex === 0}
                      className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => movePageDown(displayIndex)}
                      disabled={displayIndex === pages.length - 1}
                      className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removePageAtIndex(displayIndex)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={savePDF}
              disabled={processing || pages.length === 0}
              className="w-full px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Shuffle className="h-5 w-5" />
              <span>{processing ? 'Processing...' : 'Save Organized PDF'}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

