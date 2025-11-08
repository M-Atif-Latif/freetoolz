import { useState } from 'react';

export default function ImageBase64() {
  const [base64, setBase64] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Image to Base64</h1>
      <p className="text-gray-600 text-lg mb-6">Convert images to Base64 encoded strings</p>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
          />
        </div>
        {base64 && (
          <div className="space-y-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <img src={base64} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
            </div>
            <textarea
              value={base64}
              readOnly
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-xs bg-gray-50"
              rows={10}
            />
          </div>
        )}
      </div>
    </div>
  );
}
