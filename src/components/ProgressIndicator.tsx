import { CheckCircle, AlertCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  isProcessing?: boolean;
  progress?: number; // 0-100
  status?: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  errorMessage?: string;
  showPercentage?: boolean;
}

export default function ProgressIndicator({
  isProcessing = false,
  progress = 0,
  status = 'idle',
  message,
  errorMessage,
  showPercentage = true,
}: ProgressIndicatorProps) {
  if (status === 'idle' && !isProcessing) return null;

  return (
    <div className="w-full space-y-3">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status === 'loading' ? (
              <div className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-primary-300 border-r-primary-600 dark:border-primary-700 dark:border-r-primary-400" />
            ) : status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : status === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            ) : null}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {message || 'Processing...'}
            </span>
          </div>
          {showPercentage && progress > 0 && (
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              {progress}%
            </span>
          )}
        </div>

        {/* Progress Bar Track */}
        {progress > 0 && (
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                status === 'success'
                  ? 'bg-green-500'
                  : status === 'error'
                    ? 'bg-red-500'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && errorMessage && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-200">{errorMessage}</p>
        </div>
      )}

      {/* Success Message */}
      {status === 'success' && message && (
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">{message}</p>
        </div>
      )}
    </div>
  );
}
