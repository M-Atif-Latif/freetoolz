import { useState } from 'react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQRCode = () => {
    if (text.trim()) {
      const encodedText = encodeURIComponent(text);
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodedText}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">QR Code Generator</h1>
      <p className="text-gray-600 text-lg mb-8">Create QR codes for URLs, text, and more</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Enter Text or URL</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com or any text..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none resize-none"
            rows={4} />
        </div>

        <button onClick={generateQRCode} disabled={!text.trim()}
          className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg disabled:bg-gray-300">
          Generate QR Code
        </button>
      </div>

      {qrCodeUrl && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Your QR Code</h2>
          <div className="flex justify-center">
            <img src={qrCodeUrl} alt="QR Code" className="border-2 border-gray-200 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
