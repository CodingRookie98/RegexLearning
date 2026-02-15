import React from 'react';

interface PracticeInputProps {
  value: string;
  onChange: (value: string) => void;
  status: 'idle' | 'success' | 'error';
  errorMessage?: string | null;
}

export const PracticeInput: React.FC<PracticeInputProps> = ({ 
  value, 
  onChange, 
  status, 
  errorMessage 
}) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-1">
        Your Regex Pattern
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
          status === 'error' ? 'text-red-400' : 'text-gray-400'
        }`}>
          <span className="font-mono text-lg font-bold">/</span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full pl-8 pr-12 py-4 rounded-xl border-2 font-mono text-lg shadow-sm transition-all duration-200
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-4 focus:ring-opacity-20
            ${status === 'success' 
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500' 
              : ''}
            ${status === 'error' 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : ''}
            ${status === 'idle' 
              ? 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 hover:border-gray-300 dark:hover:border-gray-600' 
              : ''}
          `}
          placeholder="Type pattern..."
          autoFocus
          spellCheck={false}
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          {status === 'success' && (
            <span className="text-green-500 text-xl font-bold">✓</span>
          )}
          {status === 'error' && (
            <span className="text-red-500 text-xl font-bold">!</span>
          )}
          <span className="text-gray-400 font-mono text-lg font-bold ml-2">/g</span>
        </div>
      </div>
      
      <div className={`h-6 transition-all duration-300 ${errorMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        {errorMessage && (
          <p className="text-sm text-red-500 font-medium flex items-center gap-1 ml-1">
            <span>⚠️</span> {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};