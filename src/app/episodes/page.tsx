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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-8 text-center">
        <span className="text-green-600 dark:text-green-400">Rick & Morty</span> Episodes
      </h1>

      <div className="mb-4 sm:mb-8">
        <SearchInput
          value={filters.name || ''}
          onChange={handleSearchChange}
          placeholder="Search episodes..."
        />
      </div>

      {error ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">⚠️</p>
          <p className="text-xl text-red-400">{error}</p>
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
