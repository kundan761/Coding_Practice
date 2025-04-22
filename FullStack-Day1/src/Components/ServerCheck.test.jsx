import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ServerCheck from './ServerCheck';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fetch
// eslint-disable-next-line no-undef
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, title: 'Post One' },
      { id: 2, title: 'Post Two' },
      { id: 3, title: 'Post Three' },
      { id: 4, title: 'Post Four' },
      { id: 5, title: 'Post Five' },
    ]),
  })
);

describe('ServerCheck component', () => {
  beforeEach(() => {
    fetch.mockClear();
    sessionStorage.clear();
  });

  it('renders and displays fetched data', async () => {
    render(<ServerCheck />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Post One/i)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  it('refetches on button click', async () => {
    render(<ServerCheck />);

    await waitFor(() => {
      expect(screen.getByText(/Post One/i)).toBeInTheDocument();
    });

    const button = screen.getByText(/refetch/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
