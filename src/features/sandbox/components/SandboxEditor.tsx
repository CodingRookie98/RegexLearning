import React, { useState, useMemo } from 'react';
import { highlightMatches } from '../../../utils/highlightMatches';

export const SandboxEditor: React.FC = () => {
  const [regex, setRegex] = useState('');
  const [text, setText] = useState('');

  const segments = useMemo(() => highlightMatches(text, regex), [text, regex]);

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm">Regular Expression</label>
        <input
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          placeholder="Enter regex..."
          className="p-2 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 font-mono"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <label className="font-medium text-sm">Test String</label>
        
        <div className="relative flex-1 border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 overflow-hidden">
          {/* Transparent Input for typing */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type test string here..."
            className="absolute inset-0 w-full h-full p-4 font-mono text-transparent bg-transparent z-10 caret-black dark:caret-white resize-none outline-none"
            spellCheck={false}
          />
          
          {/* Backdrop for highlighting */}
          <div className="absolute inset-0 w-full h-full p-4 font-mono pointer-events-none whitespace-pre-wrap break-words z-0">
            {segments.map((seg, i) => (
              <span 
                key={i} 
                className={seg.isMatch ? "bg-yellow-200 dark:bg-yellow-900 dark:text-white" : "text-gray-900 dark:text-gray-100"}
              >
                {seg.text}
              </span>
            ))}
            {/* Ensure height matches textarea by adding a zero-width space if empty? No, whitespace-pre-wrap handles newlines */}
            {text.endsWith('\n') && <br />}
          </div>
        </div>
      </div>
    </div>
  );
};