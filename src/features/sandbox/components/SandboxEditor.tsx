import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { highlightMatches } from '../../../utils/highlightMatches';

export const SandboxEditor: React.FC = () => {
  const { t } = useTranslation();
  const [regex, setRegex] = useState('');
  const [text, setText] = useState('');

  const segments = useMemo(() => highlightMatches(text, regex), [text, regex]);

  return (
    <div className="flex flex-col gap-6 p-6 h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full">
        <label className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          {t('sandbox.regexLabel')}
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <span className="font-mono text-lg font-bold">/</span>
          </div>
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={t('sandbox.regexPlaceholder')}
            className="w-full pl-8 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
            spellCheck={false}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            <span className="font-mono text-lg font-bold">/g</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0 max-w-4xl mx-auto w-full">
        <label className="font-medium text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          {t('sandbox.testStringLabel')}
        </label>
        
        <div className="relative flex-1 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('sandbox.testStringPlaceholder')}
            className="absolute inset-0 w-full h-full p-4 font-mono text-lg text-transparent bg-transparent z-10 caret-blue-500 resize-none outline-none leading-relaxed"
            spellCheck={false}
          />
          
          <div className="absolute inset-0 w-full h-full p-4 font-mono text-lg pointer-events-none whitespace-pre-wrap break-words z-0 leading-relaxed overflow-auto">
            {segments.map((seg, i) => (
              <span 
                key={i} 
                className={seg.isMatch 
                  ? "bg-yellow-200 dark:bg-yellow-500/30 text-transparent rounded px-0.5 ring-1 ring-yellow-300 dark:ring-yellow-500/50" 
                  : "text-gray-900 dark:text-gray-100"}
              >
                {seg.text}
              </span>
            ))}
            {text.endsWith('\n') && <br />}
          </div>
        </div>
      </div>
    </div>
  );
};