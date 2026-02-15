import React from 'react';
import { SandboxEditor } from './components/SandboxEditor';

export const SandboxPage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-64px)]">
      <SandboxEditor />
    </div>
  );
};