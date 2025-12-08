'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Portal Animation */}
      <motion.div
        className="relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 opacity-80 blur-sm" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-300 via-emerald-400 to-green-600 opacity-90" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
          <motion.span
            className="text-6xl sm:text-8xl font-bold text-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            404
          </motion.span>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          <span className="text-green-600 dark:text-green-400">Wubba Lubba</span> Dub Dub!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
          Looks like you've fallen through the wrong portal, Morty!
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          This dimension doesn't exist... yet.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          href="/"
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          🧪 Back to C-137
        </Link>
        <Link
          href="/episodes"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
        >
          📺 Watch Episodes
        </Link>
      </motion.div>

      {/* Rick Quote */}
      <motion.p
        className="mt-12 text-sm text-gray-400 dark:text-gray-600 italic max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        "Nobody exists on purpose. Nobody belongs anywhere. Everybody's gonna die.
        Come watch TV." — Rick Sanchez
      </motion.p>
    </div>
  );
}
