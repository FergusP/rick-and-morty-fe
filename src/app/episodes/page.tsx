'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEpisodeStore } from '@/stores/useEpisodeStore';
import { useDebounce } from '@/hooks/useDebounce';
import { EpisodeGrid } from '@/components/episodes/EpisodeGrid';
import { SearchInput } from '@/components/ui/SearchInput';
import { Pagination } from '@/components/ui/Pagination';

function EpisodesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  const { episodes, info, loading, error, filters, setFilters, fetchEpisodes } =
    useEpisodeStore();

  const debouncedSearch = useDebounce(filters.name || '', 300);

  // Sync URL params to store on mount
  useEffect(() => {
    setFilters({
      name: searchParams.get('name') || '',
      page: Number(searchParams.get('page')) || 1,
    });
    setInitialized(true);
  }, [searchParams, setFilters]);

  // Fetch when debounced search or filters change
  useEffect(() => {
    if (initialized) {
      fetchEpisodes();
    }
  }, [initialized, debouncedSearch, filters.page]);

  const updateParams = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, String(value));
      else params.delete(key);
    });
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setFilters({ name: value, page: 1 });
    updateParams({ name: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
    updateParams({ page });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center">
        <span className="text-gradient">Episodes</span>
      </h1>

      <div className="mb-6 sm:mb-8 max-w-md mx-auto">
        <SearchInput
          value={filters.name || ''}
          onChange={handleSearchChange}
          placeholder="Search episodes..."
        />
      </div>

      {error ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-[var(--text-primary)]">Something went wrong</p>
          <p className="text-[var(--text-muted)] mt-1">{error}</p>
        </div>
      ) : (
        <>
          <EpisodeGrid episodes={episodes} loading={loading} />
          {info && (
            <Pagination
              currentPage={filters.page || 1}
              totalPages={info.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default function EpisodesHomePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>}>
      <EpisodesPage />
    </Suspense>
  );
}
