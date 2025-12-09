interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`skeleton rounded ${className}`} />
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="w-full aspect-square rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}
