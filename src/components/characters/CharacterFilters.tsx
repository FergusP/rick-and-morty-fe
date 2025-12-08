'use client';

import { SearchInput } from '@/components/ui/SearchInput';
import { FilterSelect } from '@/components/ui/FilterSelect';

interface CharacterFiltersProps {
  search: string;
  status: string;
  species: string;
  gender: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onGenderChange: (value: string) => void;
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
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
  onGenderChange,
}: CharacterFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-8">
      <div className="flex-1">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search characters..."
        />
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
