'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Character, Episode } from '@/types';
import { getCharacter, getMultipleEpisodes } from '@/lib/api';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { Skeleton } from '@/components/ui/Skeleton';

export default function CharacterDetailPage() {
  const params = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacter(Number(params.id));
        setCharacter(data);

        // Extract episode IDs from URLs
        const episodeIds = data.episode.map((url) => {
          const parts = url.split('/');
          return Number(parts[parts.length - 1]);
        });

        if (episodeIds.length > 0) {
          const eps = await getMultipleEpisodes(episodeIds);
          setEpisodes(eps);
        }
      } catch {
        setError('Character not found');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          <Skeleton className="w-full md:w-80 aspect-square rounded-xl" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
        <p className="text-6xl mb-4">👽</p>
        <p className="text-xl text-red-400">{error || 'Character not found'}</p>
        <Link href="/" className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline">
          ← Back to characters
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
      <Link href="/" className="text-green-600 dark:text-green-400 hover:underline mb-4 sm:mb-6 inline-block text-sm sm:text-base">
        ← Back to characters
      </Link>

      <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="relative w-full md:w-80 aspect-square rounded-xl overflow-hidden"
        >
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAARBRIhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AzLjuOqW+Pr2pทPKsiIzqjFtHr5+fvxjGJNXsmS2tn//2Q=="
          />
          <div className="absolute top-4 right-4">
            <FavoriteButton characterId={character.id} />
          </div>
        </motion.div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">{character.name}</h1>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <StatusBadge status={character.status} />
              <span className="text-gray-400 dark:text-gray-500">•</span>
              <span>{character.species}</span>
              {character.type && (
                <>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span>{character.type}</span>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
              <InfoCard label="Gender" value={character.gender} />
              <InfoCard label="Origin" value={character.origin.name} />
              <InfoCard label="Location" value={character.location.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Episodes ({episodes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {episodes.map((ep) => (
            <Link
              key={ep.id}
              href={`/episode/${ep.id}`}
              className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="text-green-600 dark:text-green-400 font-mono text-sm font-bold shrink-0">
                {ep.episode}
              </span>
              <span className="text-sm truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {ep.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 sm:p-4">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium text-sm sm:text-base mt-0.5 sm:mt-1 truncate">{value}</p>
    </div>
  );
}
