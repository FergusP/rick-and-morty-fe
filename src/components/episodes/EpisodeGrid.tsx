import { Episode } from '@/types';
import { EpisodeCard } from './EpisodeCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface EpisodeGridProps {
  episodes: Episode[];
  loading?: boolean;
}

function EpisodeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-3/4 mt-3" />
      <Skeleton className="h-4 w-1/3 mt-3" />
    </div>
  );
}

export function EpisodeGrid({ episodes, loading }: EpisodeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <EpisodeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">📺</p>
        <p className="text-xl text-gray-600 dark:text-gray-400">No episodes found</p>
        <p className="text-gray-500 dark:text-gray-500 mt-2">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}
