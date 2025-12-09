import { Episode } from '@/types';
import { EpisodeCard } from './EpisodeCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface EpisodeGridProps {
  episodes: Episode[];
  loading?: boolean;
}

function EpisodeCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-10 rounded-md" />
          <Skeleton className="h-6 w-10 rounded-md" />
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-3/4 mt-3" />
      <Skeleton className="h-4 w-1/3 mt-3" />
    </div>
  );
}

export function EpisodeGrid({ episodes, loading }: EpisodeGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <EpisodeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center">
          <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
        </div>
        <p className="text-lg font-medium text-[var(--text-primary)]">No episodes found</p>
        <p className="text-[var(--text-muted)] mt-1">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {episodes.map((episode, index) => (
        <EpisodeCard key={episode.id} episode={episode} index={index} />
      ))}
    </div>
  );
}
