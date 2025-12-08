'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/episode/${episode.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:ring-2 hover:ring-green-500 transition-all cursor-pointer group shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between gap-2">
            <span className="text-green-600 dark:text-green-400 font-mono text-sm sm:text-base font-bold">
              {episode.episode}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {episode.air_date}
            </span>
          </div>
          <h3 className="font-bold text-base sm:text-lg mt-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
            {episode.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            👥 {episode.characters.length} characters
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
