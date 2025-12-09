'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/stores/useThemeStore';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--portal-green)] flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
              <circle cx="12" cy="12" r="6" stroke="black" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="black" />
            </svg>
          </div>
          <span className="font-bold text-sm sm:text-lg text-gradient">Rick & Morty</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/characters"
            className="px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base text-[var(--text-secondary)] hover:text-[var(--portal-green)] hover:bg-[var(--bg-tertiary)] transition-all font-medium"
          >
            Characters
          </Link>
          <Link
            href="/episodes"
            className="px-3 py-2 sm:px-4 rounded-lg text-sm sm:text-base text-[var(--text-secondary)] hover:text-[var(--portal-green)] hover:bg-[var(--bg-tertiary)] transition-all font-medium"
          >
            Episodes
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 sm:p-2.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] transition-all"
            aria-label="Toggle theme"
          >
            {mounted && (
              theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
