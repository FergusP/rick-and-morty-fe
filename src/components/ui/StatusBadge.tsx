interface StatusBadgeProps {
  status: 'Alive' | 'Dead' | 'unknown';
}

const statusStyles = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-500',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
      <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${statusStyles[status]}`} />
      {status}
    </span>
  );
}
