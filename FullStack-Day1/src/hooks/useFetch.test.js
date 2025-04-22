import { renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock global fetch
// eslint-disable-next-line no-undef
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: 'Test post' }]),
  })
);

describe('useFetch', () => {
  beforeEach(() => {
    fetch.mockClear();
    sessionStorage.clear();
  });

  it('should fetch data and use sessionStorage', async () => {
    const { result } = renderHook(() =>
      useFetch('https://jsonplaceholder.typicode.com/posts')
    );

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);

    // Call refetch (should bypass cache)
    result.current.refetch();
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
