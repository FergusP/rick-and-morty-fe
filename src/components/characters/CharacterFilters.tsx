'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { FilterSelect } from '@/components/ui/FilterSelect';

interface CharacterFiltersProps {
  search: string;
  status: string;
  species: string;
  gender: string;
  showFavorites: boolean;
  favoritesCount: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onFavoritesToggle: () => void;
}

const statusOptions = [
  { value: 'Alive', label: 'Alive' },
  { value: 'Dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];

const genderOptions = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

const speciesOptions = [
  { value: 'Human', label: 'Human' },
  { value: 'Alien', label: 'Alien' },
  { value: 'Humanoid', label: 'Humanoid' },
  { value: 'Robot', label: 'Robot' },
  { value: 'Animal', label: 'Animal' },
  { value: 'Mythological Creature', label: 'Mythological' },
  { value: 'Poopybutthole', label: 'Poopybutthole' },
  { value: 'Cronenberg', label: 'Cronenberg' },
  { value: 'Disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' },
];

export function CharacterFilters({
  search,
  status,
  species,
  gender,
  showFavorites,
  favoritesCount,
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
  onGenderChange,
  onFavoritesToggle,
}: CharacterFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search characters..."
          />
        </div>
        <button
          onClick={onFavoritesToggle}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1.5 shrink-0 ${
            showFavorites
              ? 'bg-red-500 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-400'
          }`}
        >
          <span>{showFavorites ? '❤️' : '🤍'}</span>
          <span className="hidden sm:inline">Favorites</span>
          {favoritesCount > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              showFavorites ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4">
        <FilterSelect
          value={status}
          onChange={onStatusChange}
          options={statusOptions}
          placeholder="All Status"
        />
        <FilterSelect
          value={species}
          onChange={onSpeciesChange}
          options={speciesOptions}
          placeholder="All Species"
        />
        <FilterSelect
          value={gender}
          onChange={onGenderChange}
          options={genderOptions}
          placeholder="All Genders"
        />
      </div>
    </div>
  );
}
