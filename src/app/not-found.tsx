import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 text-center">
      {/* Portal Animation */}
      <div className="relative mb-8 w-48 h-48 sm:w-64 sm:h-64">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--portal-green)] via-[var(--portal-cyan)] to-[var(--portal-green-dark)] animate-portal-rotate opacity-30 blur-xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--portal-green)] to-[var(--portal-cyan)] opacity-20 animate-portal-pulse" />
        <div className="absolute inset-4 sm:inset-6 rounded-full bg-gradient-to-br from-[var(--portal-green-light)] via-[var(--portal-green)] to-[var(--portal-cyan)] opacity-40" />
        <div className="absolute inset-10 sm:inset-14 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
          <span className="text-5xl sm:text-7xl font-bold text-gradient">
            404
          </span>
        </div>
      </div>

      {/* Message */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-3">
          <span className="text-gradient">Wubba Lubba</span> Dub Dub!
        </h1>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg mb-2">
          Looks like you&apos;ve fallen through the wrong portal, Morty!
        </p>
        <p className="text-[var(--text-muted)] text-sm sm:text-base mb-8">
          This dimension doesn&apos;t exist... yet.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="btn-primary px-6 py-3 text-sm sm:text-base"
        >
          Back to C-137
        </Link>
        <Link
          href="/characters"
          className="btn-secondary px-6 py-3 text-sm sm:text-base"
        >
          Browse Characters
        </Link>
      </div>

      {/* Rick Quote */}
      <p className="mt-12 text-sm text-[var(--text-muted)] italic max-w-md card px-6 py-4">
        &quot;Nobody exists on purpose. Nobody belongs anywhere. Everybody&apos;s gonna die.
        Come watch TV.&quot; — Rick Sanchez
      </p>
    </div>
  );
}
