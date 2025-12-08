'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Episode, Character } from '@/types';
import { getEpisode, getMultipleCharacters } from '@/lib/api';
import { Skeleton } from '@/components/ui/Skeleton';

export default function EpisodeDetailPage() {
  const params = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ep = await getEpisode(Number(params.id));
        setEpisode(ep);

        // Extract character IDs from URLs
        const charIds = ep.characters.map((url) => {
          const parts = url.split('/');
          return Number(parts[parts.length - 1]);
        });

        if (charIds.length > 0) {
          const chars = await getMultipleCharacters(charIds);
          setCharacters(chars);
        }
      } catch {
        setError('Episode not found');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-6xl mb-4">📺</p>
        <p className="text-xl text-red-400">{error || 'Episode not found'}</p>
        <Link href="/episodes" className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline">
          ← Back to episodes
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8"
    >
      <Link href="/episodes" className="text-green-600 dark:text-green-400 hover:underline mb-4 sm:mb-6 inline-block text-sm sm:text-base">
        ← Back to episodes
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm dark:shadow-none mb-6">
        <span className="text-green-600 dark:text-green-400 font-mono text-lg sm:text-xl font-bold">
          {episode.episode}
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold mt-2 mb-4">{episode.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          📅 Air Date: {episode.air_date}
        </p>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Characters ({characters.length})
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-green-500 transition-all"
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </motion.div>
              <p className="text-xs text-center mt-1 truncate text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400">
                {character.name.split(' ')[0]}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
