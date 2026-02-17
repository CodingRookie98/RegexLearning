import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
      <Label className="mb-1 ml-1 text-muted-foreground">
        Your Regex Pattern
      </Label>
      <div className="relative group">
        <div className={cn(
          "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
          status === 'error' ? "text-destructive" : "text-muted-foreground"
        )}>
          <span className="font-mono text-lg font-bold">/</span>
        </div>
        
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "pl-7 pr-12 py-6 font-mono text-lg shadow-sm transition-all duration-200",
            status === 'success' && "border-green-500 focus-visible:ring-green-500/50",
            status === 'error' && "border-destructive focus-visible:ring-destructive/50",
            status === 'idle' && "focus-visible:ring-primary/50"
          )}
          placeholder="Type pattern..."
          autoFocus
          spellCheck={false}
        />
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none gap-2">
          {status === 'success' && (
            <span className="text-green-500 text-xl font-bold">✓</span>
          )}
          {status === 'error' && (
            <span className="text-destructive text-xl font-bold">!</span>
          )}
          <span className="text-muted-foreground font-mono text-lg font-bold">/g</span>
        </div>
      </div>
      
      <div className={cn("h-6 transition-all duration-300", errorMessage ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2")}>
        {errorMessage && (
          <p className="text-sm text-destructive font-medium flex items-center gap-1 ml-1">
            <span>⚠️</span> {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};