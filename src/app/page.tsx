'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLandingAnimations } from '@/hooks/useLandingAnimations';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useLandingAnimations(containerRef);

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Portal Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="portal-glow absolute w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-[var(--portal-green)]/20 to-[var(--portal-cyan)]/10 blur-3xl" />
        <svg className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px]" viewBox="0 0 200 200">
          <circle className="ring-1" cx="100" cy="100" r="95" fill="none" stroke="var(--portal-green)" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" style={{ transformOrigin: 'center' }} />
          <circle className="ring-2" cx="100" cy="100" r="75" fill="none" stroke="var(--portal-cyan)" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" style={{ transformOrigin: 'center' }} />
          <circle className="ring-3" cx="100" cy="100" r="55" fill="none" stroke="var(--portal-green)" strokeWidth="1.5" opacity="0.5" style={{ transformOrigin: 'center' }} />
          <circle cx="100" cy="100" r="30" fill="url(#portalGradient)" opacity="0.4" />
          <defs>
            <radialGradient id="portalGradient">
              <stop offset="0%" stopColor="var(--portal-green)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl font-black mb-4 tracking-tight text-gradient">
          Rick & Morty
        </h1>
        <p className="hero-subtitle text-xl sm:text-2xl font-medium text-[var(--text-secondary)] mb-6">
          Multiverse Explorer
        </p>
        <p className="hero-description text-[var(--text-muted)] mb-12 max-w-xl mx-auto leading-relaxed">
          Wubba lubba dub dub! Dive into the multiverse and discover characters and episodes from infinite dimensions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-10">
          <Link href="/characters" className="cta-btn btn-primary px-6 py-3 text-sm sm:text-base font-semibold inline-block">
            Explore Characters
          </Link>
          <Link href="/episodes" className="cta-btn btn-secondary px-6 py-3 text-sm sm:text-base font-semibold inline-block">
            Browse Episodes
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 border-t border-[var(--border-color)] pt-8">
          <div className="stat-item">
            <span ref={(el) => { statsRef.current.chars = el; }} className="block text-3xl sm:text-5xl font-bold text-[var(--portal-green)]">0</span>
            <span className="text-xs sm:text-sm text-[var(--text-muted)] uppercase tracking-wider">Characters</span>
          </div>
          <div className="stat-item">
            <span ref={(el) => { statsRef.current.eps = el; }} className="block text-3xl sm:text-5xl font-bold text-[var(--portal-cyan)]">0</span>
            <span className="text-xs sm:text-sm text-[var(--text-muted)] uppercase tracking-wider">Episodes</span>
          </div>
          <div className="stat-item">
            <span ref={(el) => { statsRef.current.locs = el; }} className="block text-3xl sm:text-5xl font-bold text-purple-500">0</span>
            <span className="text-xs sm:text-sm text-[var(--text-muted)] uppercase tracking-wider">Locations</span>
          </div>
        </div>
      </div>
    </div>
  );
}
