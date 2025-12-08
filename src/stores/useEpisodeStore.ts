'use client';

import { create } from 'zustand';
import { Episode, PaginationInfo, EpisodeFilters } from '@/types';
import { getEpisodes } from '@/lib/api';

interface EpisodeState {
  episodes: Episode[];
  info: PaginationInfo | null;
  loading: boolean;
  error: string | null;
  filters: EpisodeFilters;
  setFilters: (filters: Partial<EpisodeFilters>) => void;
  fetchEpisodes: () => Promise<void>;
}

export const useEpisodeStore = create<EpisodeState>((set, get) => ({
  episodes: [],
  info: null,
  loading: false,
  error: null,
  filters: {
    name: '',
    page: 1,
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  fetchEpisodes: async () => {
    set({ loading: true, error: null });

    try {
      const { filters } = get();
      const data = await getEpisodes({
        name: filters.name || undefined,
        page: filters.page,
      });
      set({ episodes: data.results, info: data.info, loading: false });
    } catch {
      set({ error: 'Failed to fetch episodes', episodes: [], loading: false });
    }
  },
}));
