import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface StatsRefs {
  chars: HTMLSpanElement | null;
  eps: HTMLSpanElement | null;
  locs: HTMLSpanElement | null;
}

export function useLandingAnimations(containerRef: React.RefObject<HTMLDivElement | null>) {
  const statsRef = useRef<StatsRefs>({ chars: null, eps: null, locs: null });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.hero-title, .hero-subtitle, .hero-description, .cta-btn, .stat-item', {
        opacity: 0,
        y: 30,
      });

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero-title', { opacity: 1, y: 0, duration: 0.8 })
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.cta-btn', { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, '-=0.2')
        .to('.stat-item', { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, '-=0.2');

      // Counter animations
      [
        { ref: statsRef.current.chars, value: 826, delay: 0.8 },
        { ref: statsRef.current.eps, value: 51, delay: 1.0 },
        { ref: statsRef.current.locs, value: 126, delay: 1.2 },
      ].forEach(({ ref, value, delay }) => {
        if (!ref) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: value,
          duration: 1.5,
          delay,
          ease: 'power2.out',
          onUpdate: () => { ref.textContent = Math.floor(counter.val).toString(); },
        });
      });

      // Portal animations
      gsap.to('.ring-1', { rotation: 360, duration: 25, ease: 'none', repeat: -1 });
      gsap.to('.ring-2', { rotation: -360, duration: 20, ease: 'none', repeat: -1 });
      gsap.to('.ring-3', { rotation: 360, duration: 15, ease: 'none', repeat: -1 });
      gsap.to('.portal-glow', { scale: 1.1, opacity: 0.7, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return statsRef;
}
