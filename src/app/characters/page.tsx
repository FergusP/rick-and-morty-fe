'use client';

import { useEffect, Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCharacterStore } from '@/stores/useCharacterStore';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useDebounce } from '@/hooks/useDebounce';
import { getMultipleCharacters } from '@/lib/api';
import { CharacterGrid } from '@/components/characters/CharacterGrid';
import { CharacterFilters } from '@/components/characters/CharacterFilters';
import { Pagination } from '@/components/ui/Pagination';
import { Character } from '@/types';

function CharactersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initialized, setInitialized] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { characters, info, loading, error, filters, setFilters, fetchCharacters } =
    useCharacterStore();
  const { favorites } = useFavoritesStore();

  useEffect(() => setMounted(true), []);

  // Fetch all favorite characters when toggled
  useEffect(() => {
    if (showFavorites && mounted && favorites.length > 0) {
      setLoadingFavorites(true);
      getMultipleCharacters(favorites)
        .then(setFavoriteCharacters)
        .finally(() => setLoadingFavorites(false));
    }
  }, [showFavorites, mounted, favorites]);

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

  const handleFavoritesToggle = () => {
    setShowFavorites((prev) => !prev);
  };

  // Filter favorite characters by name, status, species, gender
  const filteredFavorites = useMemo(() => {
    if (!showFavorites) return [];

    return favoriteCharacters.filter((c) => {
      const matchesName = !filters.name ||
        c.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesStatus = !filters.status || c.status === filters.status;
      const matchesSpecies = !filters.species || c.species === filters.species;
      const matchesGender = !filters.gender || c.gender === filters.gender;

      return matchesName && matchesStatus && matchesSpecies && matchesGender;
    });
  }, [showFavorites, favoriteCharacters, filters.name, filters.status, filters.species, filters.gender]);

  // Paginate favorites
  const paginatedFavorites = useMemo(() => {
    const start = (favoritesPage - 1) * ITEMS_PER_PAGE;
    return filteredFavorites.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFavorites, favoritesPage]);

  const favoritesTotalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);

  // Reset favorites page when filters change
  useEffect(() => {
    setFavoritesPage(1);
  }, [filters.name, filters.status, filters.species, filters.gender]);

  const displayedCharacters = showFavorites ? paginatedFavorites : characters;
  const isLoading = showFavorites ? loadingFavorites : loading;
  const favoritesCount = mounted ? favorites.length : 0;

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
        showFavorites={showFavorites}
        favoritesCount={favoritesCount}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSpeciesChange={handleSpeciesChange}
        onGenderChange={handleGenderChange}
        onFavoritesToggle={handleFavoritesToggle}
      />

      {error ? (
        <div className="text-center py-16">
          <p className="text-6xl mb-4">⚠️</p>
          <p className="text-xl text-red-400">{error}</p>
        </div>
      ) : (
        <>
          <CharacterGrid characters={displayedCharacters} loading={isLoading} />
          {showFavorites ? (
            favoritesTotalPages > 1 && (
              <Pagination
                currentPage={favoritesPage}
                totalPages={favoritesTotalPages}
                onPageChange={setFavoritesPage}
              />
            )
          ) : (
            info && (
              <Pagination
                currentPage={filters.page || 1}
                totalPages={info.pages}
                onPageChange={handlePageChange}
              />
            )
          )}
        </>
      )}
    </div>
  );
}

export default function CharactersHomePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>}>
      <CharactersPage />
    </Suspense>
  );
}
