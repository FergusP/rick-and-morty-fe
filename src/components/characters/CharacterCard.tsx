'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Character } from '@/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FavoriteButton } from '@/components/ui/FavoriteButton';

interface CharacterCardProps {
  character: Character;
  index?: number;
}

export function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/characters/${character.id}`}>
        <div className="card overflow-hidden cursor-pointer group">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAMH/8QAHxAAAgICAgMBAAAAAAAAAAAAAQIDBAARBRIhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAgADEf/aAAwDAQACEQMRAD8AzLjuOqW+Pr2pPKsiIzqjFtHr5+fvxjGJNXsmS2tn//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-2 right-2 z-10">
              <FavoriteButton characterId={character.id} />
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="font-semibold text-sm sm:text-base truncate text-[var(--text-primary)] group-hover:text-[var(--portal-green)] transition-colors">
              {character.name}
            </h3>
            <div className="flex items-center justify-between mt-2 gap-2">
              <StatusBadge status={character.status} />
              <span className="text-xs text-[var(--text-muted)] truncate">{character.species}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
