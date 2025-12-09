'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
  index?: number;
}

export function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  // Parse episode code (e.g., "S01E01")
  const seasonMatch = episode.episode.match(/S(\d+)E(\d+)/);
  const season = seasonMatch ? seasonMatch[1] : '?';
  const episodeNum = seasonMatch ? seasonMatch[2] : '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/episode/${episode.id}`}>
        <div className="card p-4 sm:p-5 cursor-pointer group h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-md bg-[var(--portal-green)]/10 text-[var(--portal-green)] text-xs font-bold">
                S{season}
              </span>
              <span className="px-2 py-1 rounded-md bg-[var(--portal-cyan)]/10 text-[var(--portal-cyan)] text-xs font-bold">
                E{episodeNum}
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
              {episode.air_date}
            </span>
          </div>

          <h3 className="font-semibold text-base sm:text-lg text-[var(--text-primary)] group-hover:text-[var(--portal-green)] transition-colors line-clamp-2 mb-3">
            {episode.name}
          </h3>

          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">{episode.characters.length} characters</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
