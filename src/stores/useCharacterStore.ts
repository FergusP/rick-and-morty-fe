'use client';

import { create } from 'zustand';
import { Character, PaginationInfo, CharacterFilters } from '@/types';
import { getCharacters } from '@/lib/api';

interface CharacterState {
  characters: Character[];
  info: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  filters: CharacterFilters;
  setFilters: (filters: Partial<CharacterFilters>) => void;
  fetchCharacters: () => Promise<void>;
}

export const useCharacterStore = create<CharacterState>((set, get) => ({
  characters: [],
  info: null,
  loading: false,
  error: null,
  filters: {
    name: '',
    status: '',
    species: '',
    gender: '',
    page: 1,
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  fetchCharacters: async () => {
    set({ loading: true, error: null });

    try {
      const { filters } = get();
      const data = await getCharacters({
        name: filters.name || undefined,
        status: filters.status as CharacterFilters['status'] || undefined,
        species: filters.species || undefined,
        gender: filters.gender || undefined,
        page: filters.page,
      });
      set({ characters: data.results, info: data.info, loading: false });
    } catch {
      set({ error: 'Failed to fetch characters', characters: [], loading: false });
    }
  },
}));
