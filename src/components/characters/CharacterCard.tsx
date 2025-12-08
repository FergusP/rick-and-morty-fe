'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Character } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/character/${character.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden hover:ring-2 hover:ring-green-500 transition-all cursor-pointer group shadow-sm dark:shadow-none">
          <div className="relative aspect-square">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAARBRIhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AzLjuOqW+Pr2pทPKsiIzqjFtHr5+fvxjGJNXsmS2tn//2Q=="
            />
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2">
              <FavoriteButton characterId={character.id} />
            </div>
          </div>
          <div className="p-2 sm:p-3 md:p-4">
            <h3 className="font-bold text-xs sm:text-sm md:text-base truncate text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              {character.name}
            </h3>
            <div className="flex items-center justify-between mt-1 sm:mt-2 text-gray-500 dark:text-gray-400">
              <StatusBadge status={character.status} />
              <span className="hidden sm:inline text-xs sm:text-sm truncate ml-1">{character.species}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
