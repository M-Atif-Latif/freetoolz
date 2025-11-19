import { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function YAMLJSONConverter() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');
  const [error, setError] = useState('');

  // Simple YAML to JSON converter (supports basic YAML)
  const yamlToJSON = (yaml: string): string => {
    try {
      setError('');
      const lines = yaml.trim().split('\n');
      const result: any = {};
      let currentObj = result;
      const stack: any[] = [result];
      let currentIndent = 0;

      lines.forEach(line => {
        const indent = line.search(/\S/);
        const trimmed = line.trim();
        
        if (!trimmed || trimmed.startsWith('#')) return;

        if (indent < currentIndent) {
          stack.pop();
          currentObj = stack[stack.length - 1];
        }

        if (trimmed.includes(':')) {
          const [key, ...valueParts] = trimmed.split(':');
          const value = valueParts.join(':').trim();
          
          if (value) {
            // Parse value
            if (value === 'true') currentObj[key.trim()] = true;
            else if (value === 'false') currentObj[key.trim()] = false;
            else if (value === 'null') currentObj[key.trim()] = null;
            else if (!isNaN(Number(value))) currentObj[key.trim()] = Number(value);
            else currentObj[key.trim()] = value.replace(/^["']|["']$/g, '');
          } else {
            currentObj[key.trim()] = {};
            stack.push(currentObj[key.trim()]);
            currentObj = currentObj[key.trim()];
          }
        } else if (trimmed.startsWith('-')) {
          const value = trimmed.substring(1).trim();
          if (!Array.isArray(currentObj)) {
            const temp = currentObj;
            currentObj = [];
            Object.keys(temp).forEach(k => currentObj[k] = temp[k]);
          }
          currentObj.push(value.replace(/^["']|["']$/g, ''));
        }

        currentIndent = indent;
      });

      return JSON.stringify(result, null, 2);
    } catch (err) {
      setError('Invalid YAML format');
      return '';
    }
  };

  // Simple JSON to YAML converter
  const jsonToYAML = (json: string): string => {
    try {
      setError('');
      const obj = JSON.parse(json);
      
      const convert = (obj: any, indent = 0): string => {
        const space = '  '.repeat(indent);
        
        if (typeof obj !== 'object' || obj === null) {
          if (typeof obj === 'string') return `"${obj}"`;
          return String(obj);
        }

        if (Array.isArray(obj)) {
          return obj.map(item => `${space}- ${convert(item, indent + 1).trim()}`).join('\n');
        }

        return Object.entries(obj)
          .map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              if (Array.isArray(value)) {
                return `${space}${key}:\n${convert(value, indent + 1)}`;
              }
              return `${space}${key}:\n${convert(value, indent + 1)}`;
            }
            return `${space}${key}: ${convert(value, 0)}`;
          })
          .join('\n');
      };

      return convert(obj, 0);
    } catch (err) {
      setError('Invalid JSON format');
      return '';
    }
  };

  const output = mode === 'yaml-to-json' ? yamlToJSON(input) : jsonToYAML(input);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <RefreshCw className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            YAML ↔ JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Convert YAML to JSON or JSON to YAML format instantly. Perfect for config files and API responses.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => { setMode('yaml-to-json'); setError(''); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'yaml-to-json'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              YAML → JSON
            </button>
            <button
              onClick={() => { setMode('json-to-yaml'); setError(''); }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                mode === 'json-to-yaml'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              JSON → YAML
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
          </div>
        )}

        {/* Input/Output Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                {mode === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
              </h2>
            </div>
            <div className="p-6">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'yaml-to-json' 
                  ? 'name: John Doe\nage: 30\nemail: john@example.com\nactive: true'
                  : '{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "active": true\n}'
                }
                className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all outline-none resize-none font-mono text-sm"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                {mode === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
              </h2>
            </div>
            <div className="p-6">
              <pre className="w-full h-96 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-auto font-mono text-sm">
                {output || <span className="text-gray-400">Converted output will appear here...</span>}
              </pre>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Note</h3>
          <p className="text-gray-700 dark:text-gray-300">
            This converter supports basic YAML and JSON syntax. Complex features like anchors, multi-line strings, 
            and advanced data types may not be fully supported. For production use, consider specialized libraries.
          </p>
        </div>
      </div>
    </div>
  );
}
