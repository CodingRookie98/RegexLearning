import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorFallbackProps {
  error: any;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Something went wrong</h2>
      <pre className="text-sm text-red-600 dark:text-red-300 mb-4 whitespace-pre-wrap">
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        {t('common.tryAgain', 'Try again')}
      </button>
    </div>
  );
};