import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function PDFMetadataEditor() {
  const howItWorks = [
    { title: 'Upload PDF', description: 'Select a PDF file to edit metadata' },
    { title: 'Edit Properties', description: 'Modify title, author, subject, and other metadata' },
    { title: 'Update', description: 'Apply the new metadata to the PDF' },
    { title: 'Download', description: 'Save your PDF with updated metadata' }
  ];

  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState({
    title: '',
    author: '',
    subject: '',
    creator: '',
    producer: '',
    keywords: ''
  });
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      
      try {
        // PDF-lib doesn't provide direct metadata access
        // Initialize with empty metadata
        setMetadata({
          title: '',
          author: '',
          subject: '',
          creator: '',
          producer: '',
          keywords: ''
        });
        
        setStatus(`Loaded: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`);
      } catch (error) {
        setStatus('Error loading PDF: ' + error);
      }
    }
  };

  const updateMetadata = async () => {
    if (!file) {
      setStatus('Please upload a PDF file first');
      return;
    }

    setProcessing(true);
    setStatus('Updating metadata...');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Update metadata
      pdfDoc.setTitle(metadata.title);
      pdfDoc.setAuthor(metadata.author);
      pdfDoc.setSubject(metadata.subject);
      pdfDoc.setCreator(metadata.creator);
      pdfDoc.setProducer(metadata.producer);
      pdfDoc.setKeywords(metadata.keywords.split(',').map(k => k.trim()));

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-metadata-updated.pdf');
      a.click();

      setStatus('Metadata updated successfully!');
    } catch (error) {
      setStatus('Error updating metadata: ' + error);
    } finally {
      setProcessing(false);
    }
  };

  const handleMetadataChange = (field: string, value: string) => {
    setMetadata(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">PDF Metadata Editor</h1>
      <p className="text-gray-600 text-lg mb-6">Edit PDF document properties and metadata</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-12 h-12 mb-4 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only</p>
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={metadata.title}
                  onChange={(e) => handleMetadataChange('title', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  placeholder="Document title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={metadata.author}
                  onChange={(e) => handleMetadataChange('author', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  placeholder="Document author"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={metadata.subject}
                  onChange={(e) => handleMetadataChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  placeholder="Document subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Creator</label>
                <input
                  type="text"
                  value={metadata.creator}
                  onChange={(e) => handleMetadataChange('creator', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  placeholder="Application that created the PDF"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                <input
                  type="text"
                  value={metadata.keywords}
                  onChange={(e) => handleMetadataChange('keywords', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>
            </div>

            <button
              onClick={updateMetadata}
              disabled={processing}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Update Metadata
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