import { Check, X, Grid2X2, List } from 'lucide-react';
import { useState } from 'react';

interface ComparisonFeature {
  name: string;
  [toolName: string]: boolean | string;
}

interface ToolComparisonProps {
  tools: {
    name: string;
    description?: string;
    icon?: string;
  }[];
  features: ComparisonFeature[];
  title?: string;
  className?: string;
}

export default function ToolComparison({
  tools,
  features,
  title,
  className = '',
}: ToolComparisonProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <div className="flex justify-center">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
      ) : (
        <div className="flex justify-center">
          <X className="w-5 h-5 text-gray-400 dark:text-gray-600" />
        </div>
      );
    }
    return <span className="text-sm text-gray-700 dark:text-gray-300">{value}</span>;
  };

  return (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {/* Header */}
      {title && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
            {/* View Toggle - Hidden on mobile by default, show on larger screens */}
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  viewMode === 'table'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
                Table
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  viewMode === 'cards'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title="Cards view"
              >
                <Grid2X2 className="w-4 h-4" />
                Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table View - Desktop/Tablet */}
      {viewMode === 'table' ? (
      <div className="overflow-x-auto">
      <table className="w-full">
        {/* Column Headers */}
        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 sticky top-0">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 sticky left-0 z-10">
              Feature
            </th>
            {tools.map((tool) => (
              <th key={tool.name} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                  {tool.description && (
                    <span className="text-xs text-gray-600 dark:text-gray-400">{tool.description}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Rows */}
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {features.map((feature, idx) => (
            <tr
              key={feature.name}
              className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900/50'}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 sticky left-0 z-10">
                {feature.name}
              </td>
              {tools.map((tool) => (
                <td
                  key={`${feature.name}-${tool.name}`}
                  className="px-6 py-4 text-center text-sm"
                >
                  {renderValue(feature[tool.name] ?? false)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      ) : (
      /* Card View - Mobile Friendly */
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {tools.map((tool) => (
            <div key={tool.name} className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Tool Header */}
              <div className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                {tool.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
                )}
              </div>
              {/* Features List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {features.map((feature) => (
                  <div
                    key={`${tool.name}-${feature.name}`}
                    className="p-4 flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900 dark:text-white text-sm">{feature.name}</span>
                    <div>{renderValue(feature[tool.name] ?? false)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Choose the tool that best fits your needs. All tools are <strong>completely free</strong> and work directly in your browser.
        </p>
      </div>
    </div>
  );
}
