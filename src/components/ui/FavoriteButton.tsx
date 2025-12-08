'use client';

import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useEffect, useState } from 'react';

interface FavoriteButtonProps {
  characterId: number;
  className?: string;
}

export function FavoriteButton({ characterId, className = '' }: FavoriteButtonProps) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isFavorite = mounted && favorites.includes(characterId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(characterId);
      }}
      className={`text-base sm:text-xl md:text-2xl transition-transform hover:scale-110 ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
