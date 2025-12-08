'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacter(Number(params.id));
        setCharacter(data);

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

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

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
        <Link href="/characters" className="mt-4 inline-block text-green-600 dark:text-green-400 hover:underline">
          ← Back to characters
        </Link>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8"
      >
        <Link href="/characters" className="text-green-600 dark:text-green-400 hover:underline mb-4 sm:mb-6 inline-block text-sm sm:text-base">
          ← Back to characters
        </Link>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full md:w-80 aspect-square rounded-xl overflow-hidden cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAARBRIhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AzLjuOqW+Pr2pทPKsiIzqjFtHr5+fvxjGJNXsmS2tn//2Q=="
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm bg-black/50 px-3 py-1 rounded-full transition-opacity">
                Click to enlarge
              </span>
            </div>
            <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
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

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-2xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <button
                className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
                onClick={() => setLightboxOpen(false)}
              >
                ×
              </button>
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <p className="text-white text-xl font-bold">{character.name}</p>
                <p className="text-gray-400 text-sm">{character.species} • {character.status}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
