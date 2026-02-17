import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppLayout } from '../components/layout/AppLayout';

describe('AppLayout', () => {
  it('renders sidebar, header and children', () => {
    render(
      <AppLayout
        sidebar={<div data-testid="sidebar">Sidebar Content</div>}
        header={<div data-testid="header">Header Content</div>}
      >
        <div data-testid="children">Main Content</div>
      </AppLayout>
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });
});
