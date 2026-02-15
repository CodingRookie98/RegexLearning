import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheatSheetPage } from './CheatSheetPage';
import { DataService } from '../../services/dataService';

// Mock DataService
vi.mock('../../services/dataService', () => ({
  DataService: {
    getCheatSheet: vi.fn(),
  },
}));

describe('CheatSheetPage Component', () => {
  it('renders categorized cheat sheet items', async () => {
    const mockItems = [
      { title: 'Item 1', code: '.', description: 'Desc 1', category: 'Cat A' },
      { title: 'Item 2', code: '\\d', description: 'Desc 2', category: 'Cat B' },
    ];
    (DataService.getCheatSheet as any).mockResolvedValue(mockItems);

    render(<CheatSheetPage />);

    // Check Categories
    expect(await screen.findByText('Cat A')).toBeInTheDocument();
    expect(await screen.findByText('Cat B')).toBeInTheDocument();

    // Check Items
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();
  });
});