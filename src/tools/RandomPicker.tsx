import { useState } from 'react';
import { Shuffle, Plus, X } from 'lucide-react';

export default function RandomPicker() {
  const [items, setItems] = useState<string[]>(['']);
  const [result, setResult] = useState('');

  const addItem = () => setItems([...items, '']);

  const removeItem = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const pickRandom = () => {
    const validItems = items.filter(item => item.trim());
    if (validItems.length > 0) {
      const random = validItems[Math.floor(Math.random() * validItems.length)];
      setResult(random);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Random Picker</h1>
      <p className="text-gray-600 text-lg mb-6">Pick a random item from your list</p>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="space-y-3 mb-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
                placeholder={`Item ${index + 1}`}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all outline-none"
              />
              {items.length > 1 && (
                <button
                  onClick={() => removeItem(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-3 mb-6">
          <button
            onClick={addItem}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Item</span>
          </button>
          <button
            onClick={pickRandom}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
          >
            <Shuffle className="h-5 w-5" />
            <span>Pick Random</span>
          </button>
        </div>

        {result && (
          <div className="p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200 text-center animate-pulse">
            <p className="text-sm text-gray-600 mb-2">Selected Item</p>
            <p className="text-4xl font-bold text-gray-900">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
