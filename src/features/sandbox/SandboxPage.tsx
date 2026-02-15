import React from 'react';
import { SandboxEditor } from './components/SandboxEditor';

export const SandboxPage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <SandboxEditor />
    </div>
  );
};