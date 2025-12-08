import { Character } from '@/types';
import { CharacterCard } from './CharacterCard';
import { CharacterCardSkeleton } from '@/components/ui/Skeleton';

interface CharacterGridProps {
  characters: Character[];
  loading?: boolean;
}

export function CharacterGrid({ characters, loading }: CharacterGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CharacterCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (characters.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-xl text-gray-400">No characters found</p>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
