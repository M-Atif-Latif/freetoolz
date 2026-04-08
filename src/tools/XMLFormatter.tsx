import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

export default function XMLFormatter() {
  const howItWorks = [
    { title: 'Paste XML Code', description: 'Paste your XML data in the input field' },
    { title: 'Auto Format', description: 'XML is automatically formatted and beautified' },
    { title: 'View Formatted', description: 'See properly indented and aligned XML' },
    { title: 'Copy Result', description: 'Copy the formatted XML to clipboard' }
  ];

  const [xml, setXml] = useState('<?xml version="1.0"?><root><user><name>John Doe</name><email>john@example.com</email></user></root>');
  const [copied, setCopied] = useState(false);

  const formatXML = (xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

      if (xmlDoc.querySelector('parsererror')) {
        return 'Error: Invalid XML';
      }

      const formatted = (node: Node, indent = ''): string => {
        let result = '';

        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];

          if (child.nodeType === 1) {
            const element = child as Element;
            result += `${indent}<${element.tagName}`;

            for (const attr of element.attributes) {
              result += ` ${attr.name}="${attr.value}"`;
            }

            if (element.childNodes.length === 0) {
              result += ' />\n';
            } else if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
              const text = element.childNodes[0].textContent;
              result += `>${text}</${element.tagName}>\n`;
            } else {
              result += '>\n';
              result += formatted(element, indent + '  ');
              result += `${indent}</${element.tagName}>\n`;
            }
          } else if (child.nodeType === 3 && child.textContent?.trim()) {
            result += `${indent}${child.textContent.trim()}\n`;
          }
        }

        return result;
      };

      return formatted(xmlDoc);
    } catch (error) {
      return 'Error: Could not parse XML';
    }
  };

  const formatted = formatXML(xml);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setXml('<?xml version="1.0"?><root><user><name>John Doe</name><email>john@example.com</email></user></root>');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">XML Formatter</h1>
      <p className="text-gray-600 text-lg mb-8">Format and beautify XML code instantly</p>

      <HowItWorks steps={howItWorks} />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">XML Input</label>
          <textarea
            value={xml}
            onChange={(e) => setXml(e.target.value)}
            placeholder="Paste your XML here..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-sm focus:border-blue-500 outline-none h-48"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Formatted Output</label>
          <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-mono text-sm bg-gray-50 h-48 overflow-auto whitespace-pre-wrap break-words">
            {formatted}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 px-6 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" /> Reset
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? 'Copied!' : 'Copy Formatted'}
          </button>
        </div>
      </div>
    </div>
  );
}
