import { Character, Episode, APIResponse, CharacterFilters, EpisodeFilters } from '@/types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(filters: CharacterFilters = {}): Promise<APIResponse<Character>> {
  const params = new URLSearchParams();

  if (filters.name) params.set('name', filters.name);
  if (filters.status) params.set('status', filters.status);
  if (filters.species) params.set('species', filters.species);
  if (filters.gender) params.set('gender', filters.gender);
  if (filters.page) params.set('page', String(filters.page));

  const query = params.toString();
  const url = `${BASE_URL}/character${query ? `?${query}` : ''}`;

  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error('Failed to fetch characters');
  }

  return res.json();
}

export async function getCharacter(id: number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);

  if (!res.ok) {
    throw new Error('Character not found');
  }

  return res.json();
}

export async function getEpisodeName(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) return 'Unknown';
  const data = await res.json();
  return data.name;
}

export async function getEpisodes(filters: EpisodeFilters = {}): Promise<APIResponse<Episode>> {
  const params = new URLSearchParams();

  if (filters.name) params.set('name', filters.name);
  if (filters.episode) params.set('episode', filters.episode);
  if (filters.page) params.set('page', String(filters.page));

  const query = params.toString();
  const url = `${BASE_URL}/episode${query ? `?${query}` : ''}`;

  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error('Failed to fetch episodes');
  }

  return res.json();
}

export async function getEpisode(id: number): Promise<Episode> {
  const res = await fetch(`${BASE_URL}/episode/${id}`);

  if (!res.ok) {
    throw new Error('Episode not found');
  }

  return res.json();
}

export async function getMultipleEpisodes(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const ep = await getEpisode(ids[0]);
    return [ep];
  }
  const res = await fetch(`${BASE_URL}/episode/${ids.join(',')}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getMultipleCharacters(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  if (ids.length === 1) {
    const char = await getCharacter(ids[0]);
    return [char];
  }
  const res = await fetch(`${BASE_URL}/character/${ids.join(',')}`);
  if (!res.ok) return [];
  return res.json();
}
