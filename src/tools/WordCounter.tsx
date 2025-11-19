import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEOWrapper, { SEOContent } from '../components/SEOWrapper';

function WordCounterTool() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
  const readingTime = Math.ceil(words / 200); // Average reading speed
  const speakingTime = Math.ceil(words / 150); // Average speaking speed
  const avgWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(1) : 0;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SEOWrapper toolId="word-counter">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* SEO-Optimized H1 */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Free Online Word Counter Tool
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          Count words, characters, sentences, and paragraphs instantly. Perfect for essays, articles, and SEO content. 100% free with no signup required.
        </p>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{words.toLocaleString()}</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Words</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{characters.toLocaleString()}</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Characters</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-800">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{sentences.toLocaleString()}</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Sentences</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{paragraphs.toLocaleString()}</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Paragraphs</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Characters (no spaces)</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{charactersNoSpaces.toLocaleString()}</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{readingTime} min</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Speaking Time</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{speakingTime} min</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Word Length</div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{avgWordLength}</div>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Enter Your Text</h2>
            <button 
              onClick={copyToClipboard} 
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Copy text to clipboard"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type or paste your text here to count words, characters, sentences, and paragraphs..."
            className="w-full p-6 text-gray-800 dark:text-gray-200 dark:bg-gray-800 text-lg leading-relaxed resize-none focus:outline-none min-h-[400px]"
            aria-label="Text input area for word counting" 
          />
        </div>

        {/* SEO Content Below The Tool */}
        <SEOContent toolId="word-counter" />
      </div>
    </SEOWrapper>
  );
}

export default WordCounterTool;
