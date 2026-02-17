import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { highlightMatches } from '../../../utils/highlightMatches';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const SandboxEditor: React.FC = () => {
  const { t } = useTranslation();
  const [regex, setRegex] = useState('');
  const [text, setText] = useState('');

    // Example match logic
    const segments = useMemo(() => {
        // If empty regex, return text as is
        if (!regex) return [{ text, isMatch: false }];
        try {
            // Simple regex match for now (mock logic in highlightMatches assumed)
            // Or rely on utils.
            return highlightMatches(text, regex);
        } catch (e) {
            return [{ text, isMatch: false }];
        }
    }, [text, regex]);

  return (
      <div className="flex flex-col gap-6 p-6 h-full bg-background">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full">
              <Label className="text-muted-foreground uppercase tracking-wider">
          {t('sandbox.regexLabel')}
              </Label>
        <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <span className="font-mono text-lg font-bold">/</span>
          </div>
                  <Input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={t('sandbox.regexPlaceholder')}
                      className="pl-8 pr-12 py-6 font-mono text-lg shadow-sm"
            spellCheck={false}
          />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground">
            <span className="font-mono text-lg font-bold">/g</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 min-h-0 max-w-4xl mx-auto w-full">
              <Label className="text-muted-foreground uppercase tracking-wider">
          {t('sandbox.testStringLabel')}
              </Label>

              <div className="relative flex-1 rounded-xl border bg-background overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('sandbox.testStringPlaceholder')}
                      className="absolute inset-0 w-full h-full p-4 font-mono text-lg text-transparent bg-transparent z-10 caret-primary resize-none outline-none leading-relaxed"
            spellCheck={false}
          />

                  <div className="absolute inset-0 w-full h-full p-4 font-mono text-lg pointer-events-none whitespace-pre-wrap break-words z-0 leading-relaxed overflow-auto text-foreground">
            {segments.map((seg, i) => (
                <span
                    key={i}
                    className={cn(
                        seg.isMatch
                            ? "bg-primary/20 text-transparent rounded px-0.5 ring-1 ring-primary/30"
                            : "text-foreground"
                    )}
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