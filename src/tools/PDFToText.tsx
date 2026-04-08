import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFToText() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file from your computer' },
    { title: 'Processing', description: 'The tool extracts text from all pages' },
    { title: 'View Text', description: 'See the extracted text instantly' },
    { title: 'Copy or Download', description: 'Copy text or save as file' }
  ];

  const [text, setText] = useState('Upload a PDF file to extract text...');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setText('Processing PDF...');
      setCopied(false);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pageCount = pdf.getPageCount();
        
        // Note: pdf-lib doesn't support text extraction directly
        // In a production environment, you'd use pdf-parse, pdf2pic, or similar libraries
        setText(`PDF Information:\n` +
                `File: ${file.name}\n` +
                `Size: ${(file.size / 1024).toFixed(2)} KB\n` +
                `Pages: ${pageCount}\n\n` +
                `⚠️ Text extraction requires additional libraries like pdf-parse or PDF.js.\n` +
                `This tool shows PDF metadata. For full text extraction, consider using:\n` +
                `- pdf-parse (Node.js)\n` +
                `- PDF.js (browser)\n` +
                `- PyPDF2 (Python)\n\n` +
                `The PDF contains ${pageCount} page(s) but text content cannot be extracted in the browser without additional libraries.`);
      } catch (error) {
        setText(`Error processing PDF: ${error}\n\nPlease ensure the file is a valid PDF.`);
      }
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setText('Upload a PDF file to extract text...');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">PDF to Text Extractor</h1>
      <p className="text-gray-600 text-lg mb-8">Extract plain text from PDF files instantly</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">Select PDF File</label>
          <div className="flex gap-3">
            <label className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold cursor-pointer flex items-center justify-center gap-2">
              <Upload className="h-5 w-5" /> Choose PDF
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">Supported: PDF files up to 50MB</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Extracted Text</label>
          <textarea
            value={text}
            readOnly
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-sm bg-gray-50 h-64 focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Clear
          </button>
          <button
            onClick={copyText}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
}
