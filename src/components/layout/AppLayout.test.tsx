import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppLayout } from './AppLayout';

describe('AppLayout', () => {
  it('renders children correctly', () => {
    render(
      <AppLayout sidebar={<div />} header={<div />}>
        <div data-testid="child-content">Child Content</div>
      </AppLayout>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders structural elements (sidebar, header, main)', () => {
    render(
      <AppLayout
        sidebar={<div data-testid="sidebar">Sidebar</div>}
        header={<div data-testid="header">Header</div>}
      >
        <div>Content</div>
      </AppLayout>
    );
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
