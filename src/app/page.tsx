'use client';

import { useEffect, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useDebounce } from '@/hooks/useDebounce';
import { CharacterGrid } from '@/components/characters/CharacterGrid';
import { CharacterFilters } from '@/components/characters/CharacterFilters';
import { Pagination } from '@/components/ui/Pagination';

function CharactersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);

  const { characters, info, loading, error, filters, setFilters, fetchCharacters } =
    useCharacterStore();

  const debouncedSearch = useDebounce(filters.name || '', 300);

  // Sync URL params to store on mount
  useEffect(() => {
    const status = searchParams.get('status') as 'Alive' | 'Dead' | 'unknown' | '' | null;
    setFilters({
      name: searchParams.get('name') || '',
      status: status || '',
      species: searchParams.get('species') || '',
      gender: searchParams.get('gender') || '',
      page: Number(searchParams.get('page')) || 1,
    });
    setInitialized(true);
  }, [searchParams, setFilters]);

  // Fetch when debounced search or filters change
  useEffect(() => {
    if (initialized) {
      fetchCharacters();
    }
  }, [initialized, debouncedSearch, filters.status, filters.species, filters.gender, filters.page]);

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

  const handleStatusChange = (value: string) => {
    setFilters({ status: value as 'Alive' | 'Dead' | 'unknown' | '', page: 1 });
    updateParams({ status: value, page: 1 });
  };

  const handleSpeciesChange = (value: string) => {
    setFilters({ species: value, page: 1 });
    updateParams({ species: value, page: 1 });
  };

  const handleGenderChange = (value: string) => {
    setFilters({ gender: value, page: 1 });
    updateParams({ gender: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
    updateParams({ page });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 sm:mb-8 text-center">
        <span className="text-green-600 dark:text-green-400">Rick & Morty</span> Characters
      </h1>

      <CharacterFilters
        search={filters.name || ''}
        status={filters.status || ''}
        species={filters.species || ''}
        gender={filters.gender || ''}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSpeciesChange={handleSpeciesChange}
        onGenderChange={handleGenderChange}
      />

      {error ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">⚠️</p>
          <p className="text-xl text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <CharacterGrid characters={characters} loading={loading} />
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

export default function HomePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>}>
      <CharactersPage />
    </Suspense>
  );
}
