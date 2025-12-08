import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rick & Morty Explorer - Discover the Multiverse',
  description: 'Explore characters, episodes, and locations from the Rick and Morty universe. Your portal to infinite dimensions.',
};

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background portal effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Logo/Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6">
          <span className="text-green-500">Rick</span>
          <span className="text-gray-600 dark:text-gray-400"> & </span>
          <span className="text-cyan-500">Morty</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
          Explorer
        </p>

        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-xl mx-auto">
          Wubba lubba dub dub! Dive into the multiverse and explore all your favorite characters and episodes from across infinite dimensions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/characters"
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-green-600/25"
          >
            Explore Characters
          </Link>
          <Link
            href="/episodes"
            className="px-8 py-4 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl transition-all hover:scale-105"
          >
            Browse Episodes
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
          <div>
            <p className="text-2xl sm:text-4xl font-bold text-green-500">826</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Characters</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-bold text-cyan-500">51</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Episodes</p>
          </div>
          <div>
            <p className="text-2xl sm:text-4xl font-bold text-purple-500">126</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Locations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
