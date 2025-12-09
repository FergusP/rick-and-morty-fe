interface StatusBadgeProps {
  status: 'Alive' | 'Dead' | 'unknown';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass = {
    Alive: 'status-alive',
    Dead: 'status-dead',
    unknown: 'status-unknown',
  }[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
