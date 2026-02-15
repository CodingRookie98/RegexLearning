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
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full p-3 rounded-md border 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2
            ${status === 'success' ? 'border-green-500 focus:ring-green-500' : ''}
            ${status === 'error' ? 'border-red-500 focus:ring-red-500' : ''}
            ${status === 'idle' ? 'border-gray-300 dark:border-gray-600 focus:ring-blue-500' : ''}
          `}
          placeholder="Enter regex..."
        />
        {status === 'success' && (
          <span className="absolute right-3 top-3 text-green-500">✓</span>
        )}
      </div>
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};