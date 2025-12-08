'use client';

import Link from 'next/link';
import { useThemeStore } from '@/stores/useThemeStore';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <span className="text-lg sm:text-2xl">🧪</span>
          <span className="font-bold text-sm sm:text-xl text-green-600 dark:text-green-400">Rick & Morty</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/characters" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            Characters
          </Link>
          <Link href="/episodes" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            Episodes
          </Link>
          <button
            onClick={toggleTheme}
            className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (theme === 'dark' ? '🌙' : '☀️')}
          </button>
        </nav>
      </div>
    </header>
  );
}
